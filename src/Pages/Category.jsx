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

  //Hämtar alla kategorier 
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

  //jämtar inlägg i vald kategori
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
    <section>
      <h1>Kategorier</h1>

      {/*visar laddningsmeddelande medans kategorier hämtas */}

return (
    <section className="category-page">
      <h1 className="category-title">Kategorier</h1>


      {loadingCategories ? (
        <p className="loading-text">Laddar kategorier...</p>
      ) : (

             //lista med länkar till varje kategori
        <ul>

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
{/* om en kategori är valde visas dess inlägg */}
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
