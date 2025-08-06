import "./ThemeToggler.scss";
import { useTheme } from "../../shared";
import { Popover } from "antd";

export default function ThemeToggler() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div style={{ marginLeft: "5rem" }}>
      <Popover content={<strong>Change Theme</strong>}>
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
    </div>
  );
}
