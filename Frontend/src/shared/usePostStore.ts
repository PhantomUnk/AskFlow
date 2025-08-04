import { create } from "zustand";
import axios from "axios";
import { useCookies } from "react-cookie";

interface PostState {
  posts: PostInterface[];
  fetchPosts: () => void;
  sendQuestion: (username: string, question: string) => void;
  authenticateToggle: (
    cookies: { [key: string]: string | undefined },
    removeCookie: (name: "session", options?: any) => void
  ) => void;
  authenticateUser: (login: string, password: string) => Promise<boolean>;
  loginWindowActive: boolean;
  setLoginWindowActive: (active: boolean) => void;
}

interface PostInterface {
  id: number;
  username: string;
  question: string;
  answer: string;
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],

  loginWindowActive: false,
  setLoginWindowActive: (active: boolean) => set({ loginWindowActive: active }),

  fetchPosts: async () => {
    await axios
      .get<PostInterface[]>("/getPosts") // ? настроено в vite.config.ts
      .then((resp) => set({ posts: resp.data }))
      .catch((err) => console.error(err));
  },

  sendQuestion: async (username: string, question: string) => {
    await axios
      .post("/addPost", { username, question }) // ? настроено в vite.config.ts
      .then(() => {
        get().fetchPosts(); // обращаемся через get
      })
      .catch((error) => {
        console.error("Ошибка при отправке вопроса:", error);
      });
  },

  authenticateUser: async (
    login: string,
    password: string
  ): Promise<boolean> => {
    return axios
      .post("/user/login", { login, password }) // ? настроено в vite.config.ts
      .then((res) => {
        return res.data;
      })
      .catch(() => {
        return false;
      });
  },

  authenticateToggle: async (
    cookies: { [key: string]: string | undefined }, // объект куки, например cookies.session
    removeCookie: (name: "session", options?: any) => void // функция удаления куки
  ) => {
    // ? Оставляем запятую на месте setCookie, т.к useCookies возвращает массив из 3 элементов

    if (cookies.session) {
      await axios.post(`/user/logout/${cookies.session}`);
      removeCookie("session");
      console.log("Хуй");

      window.location.reload();
      return;
    }

    set({ loginWindowActive: true });
  },
}));
