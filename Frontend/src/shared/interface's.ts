export interface PostInterface {
  id: number;
  username: string;
  question: string;
  answer: string;
}

export interface PostProps {
  id: number;
  username: string;
  question: string;
  answer: string;
  currentTheme: string;
}

export interface QuestionInterface {
  username: string;
  question: string;
}
