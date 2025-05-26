import { create } from "zustand";
import axios from "axios";
import { PostInterface } from "./interface's";

interface PostState {
  posts: PostInterface[];
  fetchPosts: () => void;
  sendQuestion: (username: string, question: string) => void;
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],

  fetchPosts: async () => {
    await axios
      .get<PostInterface[]>("http://127.0.0.1:8000/getPosts")
      .then((resp) => set({ posts: resp.data }))
      .catch((err) => console.error(err));
  },

  sendQuestion: async (username: string, question: string) => {
    await axios
      .post("http://127.0.0.1:8000/addPost", { username, question })
      .then(() => {
        get().fetchPosts(); // обращаемся через get
      })
      .catch((error) => {
        console.error("Ошибка при отправке вопроса:", error);
      });
  },
}));
