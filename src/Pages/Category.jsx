import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { client } from '../sanity';
import { getPostsByCategory } from '../bloggData';
import "../components/Style/Category.css";

export default function Category() {
  const { name } = useParams();
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    client
      .fetch(`*[_type == "category"]{title, slug}`)
      .then((data) => {
        setCategories(data);
        setLoadingCategories(false);
      })
      .catch((err) => {
        console.error('Kunde inte hämta kategorier', err);
        setLoadingCategories(false);
      });
  }, []);

  useEffect(() => {
    if (!name) return;

    getPostsByCategory(name)
      .then((data) => {
        setPosts(data);
        setLoadingPosts(false);
      })
      .catch((err) => {
        console.error('Kunde inte hämta kategoriposter:', err);
        setLoadingPosts(false);
      });
  }, [name]);

  return (
    <section className="category-page">
      <h1 className="category-title">Kategorier</h1>

      {loadingCategories ? (
        <p className="loading-text">Laddar kategorier...</p>
      ) : (
        <ul className="category-list">
          {categories.map((category) => (
            <li key={category.title} className="category-item">
              <Link to={`/category/${category.title}`} className="category-link">
                {category.title}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {name && (
        <>
          <h2 className="category-subtitle">Inlägg i kategori: {name}</h2>
          {loadingPosts ? (
            <p className="loading-text">Laddar inlägg...</p>
          ) : posts.length === 0 ? (
            <p className="no-posts">Inga inlägg hittades i denna kategori.</p>
          ) : (
            <ul className="list">
              {posts.map((post) => (
                <li key={post.slug.current} className="post-item">
                  <Link to={`/post/${post.slug.current}`} className="post-link">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}
