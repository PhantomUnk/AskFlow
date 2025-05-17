// src/shared/usePosts.ts
import { useState, useEffect } from "react";
import axios from "axios";
import { PostInterface } from "./interface's";

export function initPosts(): PostInterface[] {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  useEffect(() => {
    axios
      .get<PostInterface[]>("http://127.0.0.1:8000/getPosts")
      .then((resp) => setPosts(resp.data))
      .catch((err) => console.error(err));
  }, []);
  return posts;
}
