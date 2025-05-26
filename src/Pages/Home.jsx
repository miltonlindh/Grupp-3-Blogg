import { useEffect, useState } from "react";
import PostList from "../components/posts/PostList";
import { getAllPosts } from "../bloggData";
export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    getAllPosts()
      .then((data) => mounted && setPosts(data))
      .catch(() => mounted && setError("Kunde inte hämta inlägg"))
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  if (loading) return <p>Laddar inlägg…</p>;
  if (error)   return <p>{error}</p>;

  return <PostList posts={posts} />;
}