import { IoMdCloseCircle } from "react-icons/io";
import { Input } from "antd";
import "./LoginWindow.scss";
import { useState } from "react";
// import { toast } from "react-toastify";

import { usePostStore } from "../../shared/usePostStore";
import { successfulLoginNotify } from "../../shared";

interface LoginWindowProps {
  active: boolean;
  setActive: Function;
  currentTheme: string;
}

export default function LoginWindow({
  active,
  setActive,
  currentTheme,
}: LoginWindowProps) {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const authenticateUser = usePostStore((state) => state.authenticateUser);

  return (
    <div className={`loginWindow ${active ? "active" : ""}`}>
      <div className={`content ${currentTheme}`}>
        <h2 className={`title ${currentTheme}`}>Login</h2>
        <IoMdCloseCircle
          className="closeButton"
          onClick={() => setActive(false)}
        />
        <div className="inputFields">
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
          />
          <button
            className={`loginButton ${currentTheme}`}
            onClick={async (e) => {
              // ? e - event object
              e.preventDefault(); // ? default action of browser will not be executed

              const userAuthenticate = await authenticateUser(
                login,
                password,
                currentTheme
              );

              if (!userAuthenticate) {
                // setActive(false);
                return;
              }
              successfulLoginNotify(currentTheme);
              setActive(false);
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
