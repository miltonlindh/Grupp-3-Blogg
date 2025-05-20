import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostBySlug } from '../bloggData';

export default function SinglePost() {
 const { slug } = useParams(); //plockar ut slug från url
const [post, setPost] = useState(null); //här sparas inlägget
const [loading, setLoading] = useState(true);// loading är true medans vi hämtar datan


useEffect(() =>  {
  //hämtar inlägget som matchar sluggen
  getPostBySlug(slug)
  .then((data) => {
    setPost(data)
          setLoading(false);
  })
  .catch((err) => {
    console.error('kunde inte hämta inlägget', err)
           setLoading(false);
  })
}, [slug])


if (loading) return <p>Laddar...</p>//visas medans datan hämtas
if(!post) return <p>Hittade inte inlägg</p>//om inget hittades


return (
     <article>
      <h1>{post.title}</h1>
      {/* visar bild om det finns någon */}
      {post.mainImage && post.mainImage.asset && (
        <img
          src={post.mainImage.asset.url}
          alt={post.title}
          style={{ maxWidth: '100%' }}
        />
      )}
      {/* visar textinnehållet */}
      <p>{post.body}</p>
    </article>
)
}
