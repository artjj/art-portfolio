"use client";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  return (
    <button
      type="button"
      suppressHydrationWarning
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      aria-pressed={isDark}
      className={cn(
        "border-border text-fg hover:border-accent flex h-11 w-11 items-center justify-center rounded-full border transition-colors",
        className,
      )}
    >
      {isDark ? "☾" : "☀"}
    </button>
  );
}
