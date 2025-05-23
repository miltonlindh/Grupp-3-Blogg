import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { client } from '../sanity';
import { getPostsByCategory } from '../bloggData';

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
        setCategories(data);
        setLoadingCategories(false);
      })
      .catch((err) => {
        console.error('Kunde inte hämta kategorier', err);
        setLoadingCategories(false);
      });
  }, []);

  // 🔁 Hämta inlägg i vald kategori
  useEffect(() => {
    if (!name) return; // om ingen kategori är vald, skippa

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
      {loadingCategories ? (
        <p>Laddar kategorier...</p>
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category.title}>
              <Link to={`/category/${category.title}`}>{category.title}</Link>
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
                <li key={post.slug.current}>
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