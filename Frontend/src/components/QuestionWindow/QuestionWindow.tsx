import { IoMdCloseCircle } from "react-icons/io";
import { Input } from "antd";
import "./QuestionWindow.scss";
import { useState } from "react";

import { usePostStore } from "../../shared/usePostStore";

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

  const sendQuestion = usePostStore((state) => state.sendQuestion);

  const handleSend = () => {
    if (!username.trim() || !question.trim()) return; // ? optional: check for empty fields
    sendQuestion(username, question, currentTheme);
    setActive(false);
    setQuestion("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === "Enter") {
      e.preventDefault(); // ? to keep from inserting a new line
      handleSend();
    }
  };

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
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className={`sendQuestion ${currentTheme}`}
            onClick={handleSend}
          >
            Send question
          </button>
        </div>
      </div>
    </div>
  );
}
