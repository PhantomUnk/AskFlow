import "./DropdownMenu.scss";
import type { MenuProps } from "antd";
import { Dropdown, Popover } from "antd";
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
  const { authenticateToggle, isUserLoggedIn } = usePostStore();
  const { currentTheme } = useTheme();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <>{isUserLoggedIn ? <strong>Logout</strong> : <strong>Login</strong>}</>
      ),
      onClick: () => authenticateToggle(cookies, removeCookie, currentTheme),
    },
    {
      key: "2",
      onClick: () => setQuestionWindowActive(true),
      label: !isUserLoggedIn ? (
        <Popover
          content={<strong>You should be logged in to ask a question</strong>}
          placement="bottom"
        >
          <strong>Ask question</strong>
        </Popover>
      ) : (
        <strong>Ask question</strong>
      ),
      disabled: !isUserLoggedIn,
    },
  ];

  return (
    <div style={{ marginRight: "5rem" }}>
      <Dropdown
        menu={isUserLoggedIn ? { items: items.slice().reverse() } : { items }}
      >
        <button className={`ask-question ${currentTheme}`}>Menu</button>
      </Dropdown>
    </div>
  );
}
