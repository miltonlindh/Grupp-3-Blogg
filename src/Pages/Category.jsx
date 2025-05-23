import { Link,useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPostsByCategory } from '../bloggData';

export default function Category() {
    const { name } = useParams();//plockar ut kategori-namnet från url
    const [posts, setPosts] = useState([]);//lagrar inläggen i kategorin
    const [loading, setLoading] = useState(true);

      useEffect(() => {
        //hämtar inläggen för kategorin
    getPostsByCategory(name)
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Kunde inte hämta kategoriposter:', err);
        setLoading(false);
      });
  }, [name]);

    if (loading) return <p>Laddar inlägg i kategori "{name}"...</p>

    return (
         <section>
      <h1>Kategori: {name}</h1>
      {/*visar meddelande om inga inlägg hittades */}
      {posts.length === 0 ? (
        <p>Inga inlägg hittades i denna kategori</p>
      ) : (
        <ul>
          {/* visar alla inlägg i listan */}
          {posts.map((post) => (
            <li key={post.slug.current}>
              <Link to={`/post/${post.slug.current}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </section>
    )

}

