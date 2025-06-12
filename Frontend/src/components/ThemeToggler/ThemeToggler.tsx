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
      <label htmlFor="switch" className="switch">
        <input
          id="switch"
          type="checkbox"
          onChange={toggleTheme}
          checked={!isDark} // контролируем чекбокс состоянием темы: true = тёмная....
        />
        <span className="slider"></span>
        <span className="decoration"></span>
      </label>
    </Popover>
  );
}
