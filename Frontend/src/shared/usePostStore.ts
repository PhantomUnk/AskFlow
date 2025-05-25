import {create} from "zustand";
import axios from "axios";
import { PostInterface } from "./interface's";

interface PostState {
  posts: PostInterface[];
  fetchPosts: () => void;
  sendQuestion: (username: string, question: string) => void;
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],

  fetchPosts: () => {
    axios
      .get<PostInterface[]>("http://127.0.0.1:8000/getPosts")
      .then((resp) => set({ posts: resp.data }))
      .catch((err) => console.error(err));
  },

  sendQuestion: (username: string, question: string) => {
    axios
      .post("http://127.0.0.1:8000/addPost", { username, question })
      .then(() => {
        console.log("Вопрос успешно отправлен");
        get().fetchPosts(); // обновляем посты после отправки
      })
      .catch((error) => {
        console.error("Ошибка при отправке вопроса:", error);
      });
  },
}));
