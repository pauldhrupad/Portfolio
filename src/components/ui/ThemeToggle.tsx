"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/layout/ThemeProvider";
import { Button } from "./Button";

export function ThemeToggle() {
  const { theme, resolved, setTheme } = useTheme();

  return (
    <div aria-label="Theme controls" className="flex shrink-0 items-center" role="group">
      <Button
        aria-checked={resolved === "dark"}
        aria-label="Dark mode"
        onClick={() => setTheme(resolved === "dark" ? "light" : "dark")}
        role="switch"
        title="Toggle dark mode"
        variant="icon"
      >
        <Sun aria-hidden="true" className="theme-sun size-4" />
        <Moon aria-hidden="true" className="theme-moon size-4" />
      </Button>
      <Button
        aria-label="Use system theme"
        aria-pressed={theme === "system"}
        onClick={() => setTheme("system")}
        title="Use system theme"
        variant="icon"
      >
        <Monitor aria-hidden="true" className="size-4" />
      </Button>
    </div>
  );
}
