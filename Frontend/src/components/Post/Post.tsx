import "./Post.scss";
// import { PostProps } from "../../shared";

interface PostProps {
  id: number;
  username: string;
  question: string;
  answer: string;
  currentTheme: string;
}

export default function Post({
  username,
  question,
  answer,
  currentTheme,
}: PostProps) {
  return (
    <article className={`post ${currentTheme}`}>
      <h2 className={`post-author ${currentTheme}`}>{username}</h2>
      <p className="post-question">{question}</p>
      <p className="post-answer">{answer}</p>
    </article>
  );
}
