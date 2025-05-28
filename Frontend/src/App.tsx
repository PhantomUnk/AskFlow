import React, { useState } from "react";
import "./App.scss";
import { useTheme } from "./shared";
import Header from "./components/Header/Header.tsx";
import PostPage from "./components/PostPage/PostPage.tsx";
import QuestionWindow from "./components/questionWindow/QuestionWindow.tsx";
import { ToastContainer } from "react-toastify";

export default function App() {
  const [questionWindowActive, setQuestionWindowActive] =
    useState<boolean>(false);

  const { currentTheme } = useTheme();

  return (
    <div className={`app ${currentTheme}`}>
      <ToastContainer />
      <Header setQuestionWindowActive={setQuestionWindowActive} />

      <PostPage />

      <QuestionWindow
        active={questionWindowActive}
        setActive={setQuestionWindowActive}
        currentTheme={currentTheme}
      />
    </div>
  );
}
