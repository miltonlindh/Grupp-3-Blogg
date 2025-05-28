import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { client } from '../sanity';
import { getPostsByCategory } from '../bloggData';
import "../components/Style/Category.css";

export default function Category() {
  //plockar ur kategorinamnet från URLen
  const { name } = useParams(); 
  //här lagras alla kategorier samt alla inlägg som hör till
  const [categories, setCategories] = useState([]); 
  const [posts, setPosts] = useState([]);           
  //laddningstatus för alla kategorier och inlägg
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);

  // Hämta alla kategorier
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

  // Hämta inlägg i vald kategori
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
//renderar ut kategori sidan
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
            <p className="empty-text">Inga inlägg hittades i denna kategori.</p>
          ) : (
            <ul className="post-list">
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
