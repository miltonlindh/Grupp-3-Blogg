import { Link } from "react-router-dom";
import "../Style/PostList.css"; // behåll din styling

export default function PostList({ posts }) {
  if (!posts?.length) return <p>Inga inlägg hittades</p>;

  return (
    <section className="post-list">
      <h1>Senaste blogginlägg</h1>
      <div className="post-grid">
        {posts.map((post) => (
          <article key={post._id} className="post-card">
            {post.mainImage?.asset?.url && (
              <img src={post.mainImage.asset.url} alt={post.title} />
            )}
            <h2>{post.title}</h2>
            <Link to={`/post/${post.slug.current}`}>Läs mer →</Link>
          </article>
        ))}
      </div>
    </section>
  );
}