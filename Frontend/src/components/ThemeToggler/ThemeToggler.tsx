import "./ThemeToggler.scss";
import { useTheme } from "../../shared";
import { Popover } from "antd";

export default function ThemeToggler() {
  const { isDark, toggleTheme } = useTheme();
  const popoverContent = (
    <div>
      <strong>Change Theme</strong>
    </div>
  );

  return (
    <Popover content={popoverContent}>
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDark ? "☀️" : "🌙"}
      </button>
    </Popover>
  );
}
