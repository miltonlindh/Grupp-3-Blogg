import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { client } from "../sanity/sanityClient";
import "./Style/PostDetail.css";

function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post" && slug.current == $slug][0]{
          title,
          body,
          mainImage {
            asset->{
              url
            }
          }
        }`,
        { slug }
      )
      .then(setPost);
  }, [slug]);

  if (!post) return <p>Laddar...</p>;

  return (
    <article className="post-detail">
      <h1>{post.title}</h1>
      <img src={post.mainImage.asset.url} alt={post.title} />
      <p>{post.body}</p>
    </article>
  );
}

export default PostDetail;
