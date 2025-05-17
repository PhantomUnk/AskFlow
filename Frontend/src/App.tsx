import React, { useState } from "react";
import "./App.scss";
import { initPosts, useTheme } from "./shared";
import Post from "./components/Post/Post.tsx";
import QuestionWindow from "./components/questionWindow/QuestionWindow";

export default function App() {
  const [questionWindowActive, setQuestionWindowActive] =
    useState<boolean>(false);

  const posts = initPosts();

  const { isDark, toggleTheme, currentTheme } = useTheme();

  console.log(posts);

  return (
    <div className={`app ${currentTheme}`}>
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
      <main className="posts">
        {posts.map((post) => (
          <Post key={post.id} {...post} currentTheme={currentTheme} />
        ))}
      </main>

      <QuestionWindow
        active={questionWindowActive}
        setActive={setQuestionWindowActive}
        currentTheme={currentTheme}
      />
    </div>
  );
}
