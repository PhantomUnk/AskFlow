import { IoMdCloseCircle } from "react-icons/io";
import { Input } from "antd";
import { SendQuestion } from "./sendQuestion";
import "./QuestionWindow.scss";
import { useState } from "react";
// import axios from "axios";
// import { useEffect } from "react";

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

  // function sendPost(username: string, question: string) {
  //   const questionData = { username, question };

  //   console.log(username);

  //   axios
  //     .post("http://127.0.0.1:8000/addPost", questionData)
  //     .then((resp) => console.log("Вопрос отправлен"))
  //     .catch((err) => console.error("Ошибка при отправке вопроса:", err));
  // }

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
            onClick={() => SendQuestion({ username, question })}
          >
            Send question
          </button>
        </div>
      </div>
    </div>
  );
}
