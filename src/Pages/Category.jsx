import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { client } from '../sanity';
import { getPostsByCategory } from '../bloggData';
import "../components/Style/Category.css";

export default function Category() {
  const { name } = useParams(); // kategori från URL (kan vara undefined)
  const [categories, setCategories] = useState([]); // alla kategorier
  const [posts, setPosts] = useState([]);           // inlägg i vald kategori
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);

  // 🔁 Hämta alla kategorier
  useEffect(() => {
    client
      .fetch(`*[_type == "category"]{title, slug}`)
      .then((data) => {
        // Ta bort alla dubbletter baserat på category.title
        const uniqueCategories = data.filter(
          (category, index, self) =>
            index === self.findIndex((c) => c.title === category.title)
        );
  
        setCategories(uniqueCategories);
        setLoadingCategories(false);
      })
      .catch((err) => {
        console.error('Kunde inte hämta kategorier', err);
        setLoadingCategories(false);
      });
  }, []);

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
          <h2>Inlägg i kategori: {name}</h2>
          {loadingPosts ? (
            <p>Laddar inlägg...</p>
          ) : posts.length === 0 ? (
            <p>Inga inlägg hittades i denna kategori.</p>
          ) : (
            <ul>
              {posts.map((post) => (
                <li key={post.slug.current} >
                  <Link to={`/post/${post.slug.current}`}>{post.title}</Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}
