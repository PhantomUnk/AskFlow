import { IoMdCloseCircle } from "react-icons/io";
import { Input } from "antd";
import { SendQuestion } from "./sendQuestion";
import "./QuestionWindow.scss";
import { useState } from "react";
import { toast } from "react-toastify";

interface QuestionWindowProps {
  active: boolean;
  setActive: Function;
  currentTheme: string;
}

export default function QuestionWindow({
  active,
  setActive,
  currentTheme,
}: QuestionWindowProps) {
  const [username, setUsername] = useState<string>("");
  const [question, setQuestion] = useState<string>("");

  const successfulNotify = () =>
    toast.success(
      <div>
        <div>Question sent successfully!</div>
        <div style={{ fontSize: "0.9em", opacity: 0.8 }}>
          Your post will appear soon
        </div>
      </div>,
      {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: currentTheme,
      }
    );

  return (
    <div className={`questionWindow ${active ? "active" : ""}`}>
      <div className={`content ${currentTheme}`}>
        <h2 className={`title ${currentTheme}`}>Question Tab</h2>
        <IoMdCloseCircle
          className="closeButton"
          onClick={() => setActive(false)}
        />
        <div className="inputFields">
          <Input.TextArea
            className={`inputField ${currentTheme}`}
            size="large"
            placeholder="Your Name"
            autoSize={{ maxRows: 2 }}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input.TextArea
            className={`inputField ${currentTheme}`}
            size="large"
            placeholder="Your Question"
            autoSize={{ minRows: 1, maxRows: 7 }}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button
            className={`sendQuestion ${currentTheme}`}
            onClick={() => {
              SendQuestion({ username, question });
              setActive(false);
              successfulNotify();
            }}
          >
            Send question
          </button>
        </div>
      </div>
    </div>
  );
}
