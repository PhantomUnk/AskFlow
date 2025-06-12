import "./DropdownMenu.scss";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { useTheme } from "../../../shared";

interface DropdownMenuProps {
  setQuestionWindowActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DropdownMenu({
  setQuestionWindowActive,
}: DropdownMenuProps) {
  const items: MenuProps["items"] = [
    {
      key: "1",
      onClick: () => setQuestionWindowActive(true),
      label: <strong>Ask question</strong>,
    },
    {
      key: "2",
      label: <strong>Logout</strong>,
      disabled: true,
    },
  ];

  const { currentTheme } = useTheme();

  return (
    <div>
      <Dropdown menu={{ items }}>
        <button className={`ask-question ${currentTheme}`}>Menu</button>
      </Dropdown>
    </div>
  );
}
