import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) || "system";
  });

  useEffect(() => {
    const root = document.documentElement;
    const applied = theme === "system" ? getSystemTheme() : theme;
    root.classList.toggle("dark", applied === "dark");
    root.classList.toggle("light", applied === "light");
    localStorage.setItem("theme", theme);

    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = (e: MediaQueryListEvent) => {
        root.classList.toggle("dark", e.matches);
        root.classList.toggle("light", !e.matches);
      };
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, [theme]);

  const cycleTheme = () => {
    setTheme((prev) => {
      if (prev === "system") return "light";
      if (prev === "light") return "dark";
      return "system";
    });
  };

  const applied = theme === "system" ? getSystemTheme() : theme;

  return (
    <button
      onClick={cycleTheme}
      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
      title={`Theme: ${theme}`}
    >
      {applied === "dark" ? (
        <Moon className="h-4 w-4" strokeWidth={1.5} />
      ) : (
        <Sun className="h-4 w-4" strokeWidth={1.5} />
      )}
    </button>
  );
}
