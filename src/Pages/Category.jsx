import { Link,useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { client } from '../sanity';


export default function Category() {
    const { name } = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        client
        .fetch(
            `*[_type == "post" && category->title == $name]{title, slug}`,
            { name }
        )
        .then((data) => {
            setPosts(data);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Misslyckad hämtning av kategorier", err);
            setLoading(false);
        });
    }, [name]);

    if (loading) return <p>Laddar inlägg i kategori "{name}"...</p>

    return (
         <section>
      <h1>Kategori: {name}</h1>
      {posts.length === 0 ? (
        <p>Inga inlägg hittades i denna kategori</p>
      ) : (
        <ul>
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

