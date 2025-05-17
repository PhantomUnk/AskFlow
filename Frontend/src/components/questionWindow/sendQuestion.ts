import axios from "axios";
import { QuestionInterface } from "../../shared";

export const SendQuestion = async ({
  username,
  question,
}: QuestionInterface) => {
  try {
    const questionData = { username, question };
    const response = await axios.post(
      "http://127.0.0.1:8000/addPost",
      questionData
    );
    console.log("Вопрос успешно отправлен", response.data);
    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке вопроса:", error);
    throw error;
  }
};