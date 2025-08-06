import "./DropdownMenu.scss";
import type { MenuProps } from "antd";
import { Dropdown, Tooltip, Popover } from "antd";
import { useTheme } from "../../../shared";
import { Cookies, useCookies } from "react-cookie";
import { usePostStore } from "../../../shared/usePostStore";

interface DropdownMenuProps {
  setQuestionWindowActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DropdownMenu({
  setQuestionWindowActive,
}: DropdownMenuProps) {
  const [cookies, , removeCookie] = useCookies(["session"]);
  const { authenticateToggle } = usePostStore();
  const { currentTheme } = useTheme();

  const items: MenuProps["items"] = [
    {
      key: "1",
      onClick: () => setQuestionWindowActive(true),
      label: (
        <Popover
          content={<strong>You should be logged in to ask a question</strong>}
          placement="bottom"
        >
          <strong>Ask question</strong>
        </Popover>
      ),
      disabled: !cookies.session,
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
  {
    /* <Tooltip
          color={currentTheme === "dark" ? "black" : "blue"}
          title="You should be logged in to ask a question"
          placement="bottom"
        >
          <strong>Ask question</strong>
        </Tooltip> */
  }
  return (
    <div style={{ marginRight: "5rem" }}>
      <Dropdown menu={{ items }}>
        <button className={`ask-question ${currentTheme}`}>Menu</button>
      </Dropdown>
    </div>
  );
}
