import { useEffect, useState } from "react";
import "./App.scss";
import { useTheme } from "./shared";
import Header from "./components/Header/Header.tsx";
import PostPage from "./components/PostPage/PostPage.tsx";
import QuestionWindow from "./components/QuestionWindow/QuestionWindow.tsx";
import { ToastContainer } from "react-toastify";
import { ConfigProvider, theme } from "antd";

import { useCookies } from "react-cookie";
import axios from "axios";

export default function App() {
  const [questionWindowActive, setQuestionWindowActive] =
    useState<boolean>(false);

  const { currentTheme, isDark } = useTheme();

  const [cookies] = useCookies(["session"]);

  const testSession = async () => {
    await axios.post("/user/login", {
      name: "Mark",
      login: "Mark123",
      password: "123",
    });
  };

  useEffect(() => {
    testSession();
  }, []);

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

        {cookies.session ? <h1>{cookies.session}</h1> : <h1>Нету куки</h1>}

        <QuestionWindow
          active={questionWindowActive}
          setActive={setQuestionWindowActive}
          currentTheme={currentTheme}
        />
      </div>
    </ConfigProvider>
  );
}
