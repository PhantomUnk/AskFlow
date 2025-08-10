import { IoMdCloseCircle } from "react-icons/io";
import { Input } from "antd";
import "./RegisterWindow.scss";
import { useState } from "react";
// import { toast } from "react-toastify";

import { usePostStore } from "../../shared/usePostStore";
import { successfulRegisterNotify, detailErrorNotify } from "../../shared";

interface RegisterWindowProps {
  active: boolean;
  setActive: Function;
  currentTheme: string;
}

export default function RegisterWindow({
  active,
  setActive,
  currentTheme,
}: RegisterWindowProps) {
  const [login, setLogin] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const registerUser = usePostStore((state) => state.registerUser);

  const handleSend = async () => {
    if (!login.trim() || !password.trim() || !username.trim())
      detailErrorNotify(currentTheme, "Fields cannot be empty"); // * check for empty fields

    const userRegistered = await registerUser(
      username,
      login,
      password,
      currentTheme
    );

    if (!userRegistered) {
      return;
    }
    successfulRegisterNotify(currentTheme);
    setActive(false);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.ctrlKey && e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`registerWindow ${active ? "active" : ""}`}>
      <div className={`content ${currentTheme}`}>
        <h2 className={`title ${currentTheme}`}>Register</h2>
        <IoMdCloseCircle
          className="closeButton"
          onClick={() => setActive(false)}
        />
        <div className="inputFields">
          <Input.TextArea
            className={`inputField ${currentTheme}`}
            size="large"
            placeholder="Username"
            autoSize={{ maxRows: 2 }}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input.TextArea
            className={`inputField ${currentTheme}`}
            size="large"
            placeholder="Login"
            autoSize={{ maxRows: 2 }}
            onChange={(e) => setLogin(e.target.value)}
          />
          <Input.Password
            className={`inputField ${currentTheme}`}
            size="large"
            placeholder="Password"
            // autoSize={{ minRows: 1, maxRows: 7 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className={`loginButton ${currentTheme}`}
            onClick={async (e) => {
              e.preventDefault();
              await handleSend();
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
