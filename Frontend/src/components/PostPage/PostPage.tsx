import { useEffect } from "react";
import Post from "../Post/Post.tsx";
import { useTheme } from "../../shared";
import { usePostStore } from "../../shared/usePostStore";

export default function PostPage() {
  const { posts, fetchPosts } = usePostStore();
  const { currentTheme } = useTheme();

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main className="posts">
      {posts.map((post) => (
        <Post key={post.id} {...post} currentTheme={currentTheme} />
      ))}
    </main>
  );
}
