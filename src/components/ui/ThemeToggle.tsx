"use client";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/components/layout/ThemeProvider";

export function ThemeToggle() {
  const { theme, resolved, setTheme } = useTheme();

  return (
    <div aria-label="Theme controls" className="theme-controls" role="group">
      <button
        aria-checked={resolved === "dark"}
        aria-label={resolved === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        className="theme-switch"
        data-mode={resolved}
        onClick={() => setTheme(resolved === "dark" ? "light" : "dark")}
        role="switch"
        type="button"
      >
        <Sun aria-hidden="true" className="theme-sun" size={16} />
        <Moon aria-hidden="true" className="theme-moon" size={16} />
        <span aria-hidden="true" className="theme-knob" />
      </button>
      <button
        aria-label="Use system theme"
        aria-pressed={theme === "system"}
        className="theme-system"
        onClick={() => setTheme("system")}
        title={theme === "system" ? "Following system theme" : "Use system theme"}
        type="button"
      >
        <Monitor aria-hidden="true" size={16} />
      </button>
    </div>
  );
}
