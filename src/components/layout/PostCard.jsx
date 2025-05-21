import "../Style/PostCard.css";

function PostCard({ title, text, imageUrl }) {
  return (
    <section className="post-card-wrapper">
      <div className="post-card">
        <img src={imageUrl} alt={title} />
        <a href="/bloggar" className="post-link">
          {title}
        </a>
      </div>
      <p className="intro-text">{text}</p>
    </section>
  );
}

export default PostCard;
