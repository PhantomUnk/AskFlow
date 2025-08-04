import "./DropdownMenu.scss";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { useTheme } from "../../../shared";
import { useCookies } from "react-cookie";
import { usePostStore } from "../../../shared/usePostStore";

interface DropdownMenuProps {
  setQuestionWindowActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DropdownMenu({
  setQuestionWindowActive,
}: DropdownMenuProps) {
  const [cookies, , removeCookie] = useCookies(["session"]);
  const { authenticateToggle } = usePostStore();

  const items: MenuProps["items"] = [
    {
      key: "1",
      onClick: () => setQuestionWindowActive(true),
      label: <strong>Ask question</strong>,
    },
    {
      key: "2",
      label: (
        <>
          {cookies.session ? <strong>Logout</strong> : <strong>Login</strong>}
        </>
      ),
      onClick: () => authenticateToggle(cookies, removeCookie, currentTheme),
    },
  ];

  const { currentTheme } = useTheme();

  return (
    <div style={{ marginRight: "5rem" }}>
      <Dropdown menu={{ items }}>
        <button className={`ask-question ${currentTheme}`}>Menu</button>
      </Dropdown>
    </div>
  );
}
