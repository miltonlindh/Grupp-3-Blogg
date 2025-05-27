import { useEffect, useState } from "react";
import PostList from "../components/posts/PostList";
import { getAllPosts } from "../bloggData";
export default function Home() {
  const [posts, setPosts] = useState([]);//sparar inläggen
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);//om något går fel

  useEffect(() => {
    let mounted = true;//säkerställer att vi försöker uppdatera state efter unmount
    getAllPosts()
      .then((data) => mounted && setPosts(data))//sparar inläggen
      .catch(() => mounted && setError("Kunde inte hämta inlägg"))//om det går dåligt
      .finally(() => mounted && setLoading(false));//slutar ladda oavsett vad
    return () => (mounted = false);//cleanup funktion
  }, []);
//laddar fortfarande
  if (loading) return <p>Laddar inlägg…</p>;
//något gick fel
  if (error)   return <p>{error}</p>;
//allt klart visar listsn
  return <PostList posts={posts} />;
}