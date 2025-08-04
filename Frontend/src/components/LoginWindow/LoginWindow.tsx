import { IoMdCloseCircle } from "react-icons/io";
import { Input } from "antd";
import "./LoginWindow.scss";
import { useState } from "react";
import { toast } from "react-toastify";

import { usePostStore } from "../../shared/usePostStore";

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

  const failedNotify = () =>
    toast.error(
      <div>
        <div>Login Failed!</div>
        <div style={{ fontSize: "0.9em", opacity: 0.8 }}>
          Something went wrong. Please try again later. If the issue continues,
          please contact us!
        </div>
      </div>,
      {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: currentTheme,
      }
    );

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
            onClick={async () => {
              console.log(login);
              console.log(password);
              console.log(authenticateUser(login, password));

              const userAuthenticate = await authenticateUser(login, password);

              if (!userAuthenticate) {
                failedNotify();
                // setActive(false);
                return;
              }

              setActive(false);

              // window.location.reload();
              // if (!authenticateUser(login, password)) {
              //   failedNotify();
              //   return;
              // }
              // window.location.reload();
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
