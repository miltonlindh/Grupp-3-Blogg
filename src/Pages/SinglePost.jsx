import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostBySlug } from "../bloggData"; //hämtar specifikt inlägg från sanity
import BlockContent from "@sanity/block-content-to-react";//för att visa sanity bodyfält med rich text

export default function SinglePost() {
  const { slug } = useParams();//pluckar ur slug ur URLen
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);//laddningstatus
//kör när komponenten mountas eller slug ändras
  useEffect(() => {
    getPostBySlug(slug)
      .then((data) => setPost(data))//lägger in inlägget i state
      .finally(() => setLoading(false));
  }, [slug]);
//visar laddtetxt om det fortfarande hämtas
  if (loading) return <p>Laddar…</p>;
  //fallback om det inte hittas
  if (!post)    return <p>Hittade inte inlägg</p>;

  return (
    <article>
      <h1>{post.title}</h1>
       {/*visar bild om det finns en */}
      {post.mainImage?.asset?.url && (
        <img src={post.mainImage.asset.url} alt={post.title} style={{ maxWidth: "100%" }} />
      )}
      {/*visar bodyinnehåll med sanitys blockrendering*/}
      <BlockContent
      blocks={post.body}
      projectId="din_project_id"
      dataset="production"
      />
      {/* tillbaka länk */}
      <Link to="/">← Tillbaka</Link>
    </article>
  );
}