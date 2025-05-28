import "./header.scss";
import { useTheme } from "../../shared";
import ThemeToggler from "../ThemeToggler/ThemeToggler";

interface HeaderProps {
  setQuestionWindowActive: 
  React.Dispatch<React.SetStateAction<boolean>>;
}


export default function Header({ setQuestionWindowActive }: HeaderProps) {
  const { currentTheme } = useTheme();
  return (
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
      <ThemeToggler />
    </header>
  );
}
