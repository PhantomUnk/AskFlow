import "./ThemeToggler.scss";
import { useTheme } from "../../shared";

export default function ThemeToggler() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}
