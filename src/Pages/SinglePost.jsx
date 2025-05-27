import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostBySlug } from "../bloggData";
import { PortableText } from '@portabletext/react';
import "../components/Style/PostList.css";

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
<article className="post-list">
  <h1>{post.title}</h1>
  <div className="post-grid">

  {post.mainImage?.asset?.url && (
    <img
      src={post.mainImage.asset.url}
      alt={post.title}
      style={{
        maxWidth: "80%",   
        display: "block",  
        margin: "0 auto",
      }}
    />
  )}

  {Array.isArray(post.body) ? (
    <PortableText value={post.body} />
  ) : post.body ? (
    <p style={{whiteSpace: "pre-line" }}>{post.body}</p>
  ) : null }

  <button className="back-btn">
    <Link to="/" style={{color: "#0000FF"}}>← Tillbaka</Link>
  </button>
  </div>
</article>
  );
}