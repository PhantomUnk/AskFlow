import Post from "../Post/Post.tsx";
import { initPosts, useTheme } from "../../shared";

export default function PostPage() {
  const posts = initPosts();

  const { currentTheme } = useTheme();

  return (
    <main className="posts">
      {posts.map((post) => (
        <Post key={post.id} {...post} currentTheme={currentTheme} />
      ))}
    </main>
  );
}
