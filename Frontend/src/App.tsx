import React, { useState } from "react";
import "./App.scss";
import { useTheme } from "./shared";
import PostPage from "./components/PostPage/PostPage.tsx";
import QuestionWindow from "./components/questionWindow/QuestionWindow";
import { ToastContainer } from "react-toastify";

export default function App() {
  const [questionWindowActive, setQuestionWindowActive] =
    useState<boolean>(false);

  const { isDark, toggleTheme, currentTheme } = useTheme();

  return (
    <div className={`app ${currentTheme}`}>
      <ToastContainer />
      <header className="header">
        <button
          className={`ask-question ${currentTheme}`}
          onClick={() => setQuestionWindowActive(true)}
        >
          Ask question
        </button>
        <div className="header-title-wrapper">
          <h1 className={`header-title ${currentTheme}`}>AskFlow</h1>
        </div>
        <div className="header-spacer"></div>
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDark ? "☀️" : "🌙"}
        </button>
      </header>

      <PostPage />

      <QuestionWindow
        active={questionWindowActive}
        setActive={setQuestionWindowActive}
        currentTheme={currentTheme}
      />
    </div>
  );
}
