import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../sanity';

export default function SinglePost() {
 const { slug } = useParams();
const [post, setPost] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
    client
    .fetch(
        `*[_type == "post" && slug.current == $slug][0]{title, body, mainImage}`,
        { slug }
    )
    .then((data) => {
        setPost(data);
        setLoading(false);
    })
    .catch((err) => {
        console.error("Hämtning av inlägg misslyckades:", err);
        setLoading(false)
    });
}, [slug]);
if (loading) return <p>Laddar...</p>
if(!post) return <p>Hittade inte inlägg</p>

return (
     <article>
      <h1>{post.title}</h1>
      {post.mainImage && post.mainImage.asset && (
        <img
          src={post.mainImage.asset.url}
          alt={post.title}
          style={{ maxWidth: '100%' }}
        />
      )}
      <p>{post.body}</p>
    </article>
)
}
