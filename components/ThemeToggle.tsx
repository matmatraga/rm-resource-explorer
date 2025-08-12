"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // avoid SSR/CSR mismatch

  const next = resolvedTheme === "dark" ? "light" : "dark";

  return (
    <button
      aria-label="Toggle theme"
      className="rounded-lg border px-3 py-1 text-sm hover:bg-black/5 dark:hover:bg-white/10"
      onClick={() => setTheme(next)}
    >
      {resolvedTheme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
