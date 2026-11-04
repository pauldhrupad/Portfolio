"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = Exclude<Theme, "system">;

type ThemeContextValue = {
  theme: Theme;
  resolved: ResolvedTheme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getStoredTheme(): Theme {
  try {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    return savedTheme === "light" || savedTheme === "dark" ? savedTheme : "system";
  } catch {
    return "system";
  }
}

function resolveTheme(theme: Theme, prefersDark: boolean): ResolvedTheme {
  return theme === "system" ? (prefersDark ? "dark" : "light") : theme;
}

function applyTheme(theme: ResolvedTheme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  const color = getComputedStyle(root).getPropertyValue("--background").trim();
  document
    .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
    .forEach((meta) => meta.setAttribute("content", color));
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system");
  const [resolved, setResolved] = useState<ResolvedTheme>("light");
  const preference = useRef<Theme>("system");

  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");

    const apply = () => {
      const choice = preference.current;
      const next = resolveTheme(choice, query.matches);
      applyTheme(next);
      setTheme(choice);
      setResolved(next);
    };

    const syncStoredPreference = () => {
      preference.current = getStoredTheme();
      apply();
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "portfolio-theme" || event.key === null) syncStoredPreference();
    };

    syncStoredPreference();
    query.addEventListener("change", apply);
    window.addEventListener("storage", handleStorage);

    return () => {
      query.removeEventListener("change", apply);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  function choose(next: Theme) {
    const value = resolveTheme(next, window.matchMedia("(prefers-color-scheme: dark)").matches);
    preference.current = next;

    try {
      if (next === "system") {
        window.localStorage.removeItem("portfolio-theme");
      } else {
        window.localStorage.setItem("portfolio-theme", next);
      }
    } catch {
      // The selected theme still applies for this session when storage is unavailable.
    }

    applyTheme(value);
    setTheme(next);
    setResolved(value);
  }

  return <ThemeContext.Provider value={{ theme, resolved, setTheme: choose }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider.");
  }

  return context;
}
