import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostBySlug } from "../bloggData";
import { PortableText } from '@portabletext/react';

export default function SinglePost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPostBySlug(slug)
      .then((data) => setPost(data))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p>Laddar…</p>;
  if (!post)    return <p>Hittade inte inlägg</p>;

  return (
    <article>
      <h1>{post.title}</h1>
      {post.mainImage?.asset?.url && (
        <img src={post.mainImage.asset.url} alt={post.title} style={{ maxWidth: "100%" }} />
      )}

      <PortableText value={post.body} />
        
      <Link to="/">← Tillbaka</Link>
    </article>
  );
}