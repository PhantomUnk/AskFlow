import React, { useState } from "react";
import "./App.scss";
import { useTheme } from "./shared";
import Header from "./components/Header/Header.tsx";
import PostPage from "./components/PostPage/PostPage.tsx";
import QuestionWindow from "./components/QuestionWindow/QuestionWindow.tsx";
import { ToastContainer } from "react-toastify";
import { ConfigProvider, theme } from "antd";

export default function App() {
  const [questionWindowActive, setQuestionWindowActive] =
    useState<boolean>(false);

  const { currentTheme, isDark } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
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
    </ConfigProvider>
  );
}
