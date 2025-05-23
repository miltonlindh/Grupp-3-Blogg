import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../bloggData';

export default function Home() {
  const [posts, setPosts]   = useState([]);   // lagrar inlägg
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let isMounted = true;               // skydd mot setState efter unmount
    getAllPosts()
      .then(data => {
        if (isMounted) setPosts(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error('Kunde inte hämta inlägg', err);
        if (isMounted) setError('Kunde inte hämta inlägg');
      })
      .finally(() => isMounted && setLoading(false));

    return () => { isMounted = false; };
  }, []);

  /* 1. Laddar… */
  if (loading) return <p>Laddar inlägg…</p>;

  /* 2. Felmeddelande */
  if (error)   return <p>{error}</p>;

  /* 3. Själva listan */
  return (
    <section>
      <h1>Alla inlägg</h1>

      {posts.length === 0 ? (
        <p>Inga inlägg hittades</p>
      ) : (
        <ul>
          {posts
            .filter(post => post && post.slug?.current) // filtrera bort null / saknade slug
            .map(post => (
              <li key={post.slug.current}>
                <Link to={`/post/${post.slug.current}`}>
                  {post.title ?? '(saknar titel)'}
                </Link>
              </li>
            ))}
        </ul>
      )}
    </section>
  );
}
