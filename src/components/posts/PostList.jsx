import { Link } from "react-router-dom";
import "./Style/PostList.css";

function PostList({ posts }) {
  return (
    <section className="post-list">
      <h1>Senaste blogginlägg</h1>
      <div className="post-grid">
        {posts.map((post) => (
          <article key={post._id} className="post-card">
            <img src={post.mainImage.asset.url} alt={post.title} />
            <h2>{post.title}</h2>
            <Link to={`/post/${post.slug.current}`}>Läs mer →</Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PostList;
