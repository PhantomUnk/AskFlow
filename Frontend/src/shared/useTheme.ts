// useTheme.ts
import { useState, useEffect } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("is-dark");
    return saved ? JSON.parse(saved) : false;
  });

  const toggleTheme = () => {
    const newTheme = !isDark;
    localStorage.setItem("is-dark", JSON.stringify(newTheme));
    setIsDark(newTheme);
  };

  useEffect(() => {
    document.documentElement.style.background = isDark ? "#1a1a1a" : "#f7fafc";
  }, [isDark]);

  return { isDark, toggleTheme, currentTheme: isDark ? "dark" : "light" };
}
