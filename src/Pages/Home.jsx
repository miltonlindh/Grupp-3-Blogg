
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../sanity';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "post"]{title, slug}`)
      .then((data) => {
        console.log("Data från Sanity:", data);
        setPosts(data);
      })
      .catch((err) => {
        console.error("Fel vid hämtning från Sanity:", err);
      });
  }, []);

  return (
    <section>
      <h1>Alla inlägg</h1>
      {posts.length === 0 ? (
        <p>Inga inlägg hittades</p>
      ) : (
        <ul>
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



