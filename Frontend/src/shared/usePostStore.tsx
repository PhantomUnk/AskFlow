import { create } from "zustand";
import axios from "axios";

import { infoLogoutNotify, detailErrorNotify } from "./toastNotifies";

interface PostState {
  posts: PostInterface[];
  fetchPosts: () => void;
  sendQuestion: (username: string, question: string) => void;
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: (value: boolean) => void;
  fetchCookiesOnValid: (
    removeCookie: (name: "session", options?: any) => void
  ) => void;
  authenticateToggle: (
    cookies: { [key: string]: string | undefined },
    removeCookie: (name: "session", options?: any) => void,
    currentTheme: string
  ) => void;
  authenticateUser: (
    // ? login user
    login: string,
    password: string,
    currentTheme: string
  ) => Promise<boolean>;
  registerUser: (
    username: string,
    login: string,
    password: string,
    currentTheme: string
  ) => Promise<boolean>;
  loginWindowActive: boolean;
  setLoginWindowActive: (active: boolean) => void;
  registerWindowActive: boolean;
  setRegisterWindowActive: (active: boolean) => void;
}

interface PostInterface {
  id: number;
  username: string;
  question: string;
  answer: string;
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],

  registerWindowActive: false,
  setLoginWindowActive: (active: boolean) => set({ loginWindowActive: active }),

  loginWindowActive: false,
  setRegisterWindowActive: (active: boolean) =>
    set({ registerWindowActive: active }),

  fetchPosts: async () => {
    await axios
      .get<PostInterface[]>("/getPosts") // ? настроено в vite.config.ts
      .then((resp) => set({ posts: resp.data }))
      .catch((err) => console.error(err));
  },

  sendQuestion: async (username: string, question: string) => {
    await axios
      .post("/addPost", {
        username,
        question,
      }) // ? настроено в vite.config.ts
      .then(() => {
        get().fetchPosts(); // обращаемся через get
      })
      .catch((error) => {
        console.error("Ошибка при отправке вопроса:", error);
      });
  },

  isUserLoggedIn: false,
  setIsUserLoggedIn: (value) => set({ isUserLoggedIn: value }),

  fetchCookiesOnValid: async (
    removeCookie: (name: "session", options?: any) => void
  ) => {
    return await axios
      .get(`/user/checkExistSession`) // ? настроено в vite.config.ts
      .then((res) => {
        console.log(res.data);
        if (!res.data) {
          removeCookie("session");
        }
      })
      .catch(() => {
        removeCookie("session");
      });
  },

  authenticateUser: async (
    login: string,
    password: string,
    currentTheme: string
  ): Promise<boolean> => {
    return await axios
      .post("/user/login", {
        login,
        password,
      }) // ? настроено в vite.config.ts
      .then((res) => {
        console.log(res.data.detail);
        return res.data;
      })
      .catch((res) => {
        const message = res.response.data.detail;
        detailErrorNotify(currentTheme, message);
      });
  },

  registerUser: async (
    username: string,
    login: string,
    password: string,
    currentTheme: string
  ): Promise<boolean> => {
    return await axios
      .post("/user/register", {
        name: username,
        login: login,
        password: password,
      }) // ? настроено в vite.config.ts
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((res) => {
        const message = res.response.data.detail;
        detailErrorNotify(currentTheme, message);
      });
  },

  authenticateToggle: async (
    cookies: { [key: string]: string | undefined }, // объект куки, например cookies.session
    removeCookie: (name: "session", options?: any) => void,
    currentTheme: string // функция удаления куки
  ) => {
    // ? Оставляем запятую на месте setCookie, т.к useCookies возвращает массив из 3 элементов

    if (cookies.session) {
      await axios.post(`/user/logout`);
      removeCookie("session");
      infoLogoutNotify(currentTheme);
      return;
    }

    set({ loginWindowActive: true });
  },
}));
