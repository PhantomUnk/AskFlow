import { useState } from "react";
import "./App.scss";
import { useTheme, usePostStore } from "./shared";
import Header from "./components/Header/Header.tsx";
import PostPage from "./components/PostPage/PostPage.tsx";
import QuestionWindow from "./components/QuestionWindow/QuestionWindow.tsx";
import LoginWindow from "./components/LoginWindow/LoginWindow.tsx";
import { ToastContainer } from "react-toastify";
import { ConfigProvider, theme } from "antd";

import { useCookies } from "react-cookie";

import { useEffect } from "react";

export default function App() {
  const [questionWindowActive, setQuestionWindowActive] =
    useState<boolean>(false);

  const {
    loginWindowActive,
    setLoginWindowActive,
    fetchCookiesOnValid,
    setIsUserLoggedIn,
    isUserLoggedIn,
  } = usePostStore();

  const { currentTheme, isDark } = useTheme();

  const [cookies, , removeCookie] = useCookies(["session"]);

  useEffect(() => {
    fetchCookiesOnValid(cookies, removeCookie);
    setIsUserLoggedIn(cookies.session);
  }, [cookies]);

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

        {isUserLoggedIn ? <h1>{cookies.session}</h1> : <h1>Нету куки</h1>}

        <QuestionWindow
          active={questionWindowActive}
          setActive={setQuestionWindowActive}
          currentTheme={currentTheme}
        />

        <LoginWindow
          active={loginWindowActive}
          setActive={setLoginWindowActive}
          currentTheme={currentTheme}
        />
      </div>
    </ConfigProvider>
  );
}
