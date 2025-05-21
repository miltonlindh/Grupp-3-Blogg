
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../bloggData';

export default function Home() {
  const [posts, setPosts] = useState([]);//spara inläggen vi hämtar

  useEffect(() => {
    //den körs när sidan laddas, hämtar alla inlägg från sanity
    getAllPosts()
    .then((data) => setPosts(data))//lagrar resultat
    .catch((err) => console.error('kunde inte hämta inlägg', err))
  }, []);


  return (
    <section>
      <h1>Alla inlägg</h1>
      {/*visar fallback om inga inlägg finns */}
      {posts.length === 0 ? (
        <p>Inga inlägg hittades</p>
      ) : (
        <ul>
          {/*loopar igenom inläggen och visar länk */}
          {posts.map((post) => (
            <li key={post.slug.current}>
              <Link to={`/post/${post.slug.current}`}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}



