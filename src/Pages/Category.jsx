import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { client } from '../sanity';
import { getPostsByCategory } from '../bloggData';
import "../components/Style/Category.css";

export default function Category() {

  // plockar ur kategorinamnet från URLen (typ /category/Natur)
  const { name } = useParams(); 

  // här lagras alla kategorier samt inlägg i vald kategori
  const [categories, setCategories] = useState([]); 
  const [posts, setPosts] = useState([]);           

  // laddningsstatus för kategorier och inlägg
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);

  // hämta alla kategorier från Sanity när komponenten laddas
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

  // hämta inlägg som hör till den valda kategorin
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

      {/* visar "laddar..." om kategorier inte är hämtade än */}
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

      {/* om en kategori är vald – visa alla inlägg i den */}
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
