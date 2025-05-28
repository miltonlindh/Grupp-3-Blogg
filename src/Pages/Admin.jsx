import { useState, useEffect } from 'react';
import { client } from '../sanity';
import '../components/Style/PostList.css';
import '../components/Style/Category.css';
import '../components/Nav.css';

export default function Admin() {
  //kolla om man är inloggad som admin
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  //håller koll på inlägg, kategorier och imputfält
  const [posts, setPosts] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSlug, setEditSlug] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
//om användaren redan är inloggad
  useEffect(() => {
    if (localStorage.getItem('admin') === 'true') {
      setIsAdmin(true);
    }
  }, []);
//när vi är inloggade, hämtas allt vi behvöer
  useEffect(() => {
    if (isAdmin) {
      client.fetch(`*[_type == "post"]{_id, title, slug}`).then(setPosts);
      client.fetch(`*[_type == "category"]{_id, title}`).then(setCategories);
    }
  }, [isAdmin]);
//tar bort ett inlägg man bekräftat
  function deletePost(id) {
    const confirmDelete = window.confirm('Vill du ta bort inlägget?');
    if (!confirmDelete) return;

    client.delete(id)
      .then(() => {
        setPosts((prev) => prev.filter((post) => post._id !== id));
        alert('Inlägg borttaget');
      })
      .catch((err) => console.error('Kunde inte ta bort inlägget:', err));
  }
//enkel lösenordsinloggning
  function handleLogin() {
    if (password === 'hemligt') {
      localStorage.setItem('admin', 'true');
      setIsAdmin(true);
    } else {
      alert('Fel lösenord');
    }
  }
//loggar ut admin från localstorage
  function handleLogout() {
    localStorage.removeItem('admin');
    setIsAdmin(false);
  }
//skapar nytt inlägg, kollar att allt är ifyllt
  function createPost() {
    if (!newTitle || !newSlug) return alert('Fyll i både titel och slug');

    const newPost = {
      _type: 'post',
      title: newTitle,
      slug: {
        _type: 'slug',
        current: newSlug,
      },
      categories: selectedCategoryId ? [{ _type: 'reference', _ref: selectedCategoryId }] : []
    };

    client.create(newPost)
      .then((created) => {
        setPosts((prev) => [...prev, created]);
        setNewTitle('');
        setNewSlug('');
        setSelectedCategoryId('');
        alert('Inlägg skapat');
      })
      .catch((err) => console.error('Kunde inte skapa inlägg:', err));
  }
//startar redigering
  function startEdit(post) {
    setEditingId(post._id);
    setEditTitle(post.title);
    setEditSlug(post.slug.current);
  }
//sparar ändringar
  function saveEdit() {
    client.patch(editingId)
      .set({
        title: editTitle,
        slug: {
          _type: 'slug',
          current: editSlug,
        }
      })
      .commit()
      .then((updated) => {
        setPosts((prev) => prev.map(post => post._id === updated._id ? updated : post));
        setEditingId(null);
        setEditTitle('');
        setEditSlug('');
        alert('Inlägg uppdaterat!');
      })
      .catch((err) => console.error('Kunde inte uppdatera:', err));
  }
//visar bara login om vi inte redan är inloggade
  if (!isAdmin) {
    return (
      <section className="category-page">
        <h1 className="category-title">Admin login</h1>
        <input
          className="category-input"
          type="password"
          placeholder="Skriv lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="category-btn" onClick={handleLogin}>Logga in</button>
      </section>
    );
  }
//själva adminpanelen visas här
  return (
    <section className="category-page">
      <h1 className="category-title">Adminläge</h1>
      <button className="category-btn" onClick={handleLogout}>Logga ut</button>

      <h2 className="category-title">Skapa nytt inlägg</h2>
      <input
        className="category-input"
        placeholder="Titel"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <input
        className="category-input"
        placeholder="Slug (url-namn)"
        value={newSlug}
        onChange={(e) => setNewSlug(e.target.value)}
      />

      <select
        className="category-input"
        value={selectedCategoryId}
        onChange={(e) => setSelectedCategoryId(e.target.value)}
      >
        <option value="">-- Välj kategori --</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>{cat.title}</option>
        ))}
      </select>

      <button className="category-btn" onClick={createPost}>Skapa</button>

      <h2 className="category-title">Alla inlägg</h2>
      <ul className="post-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        {posts.map((post) => (
          <li key={post._id} className="post-card">
            {editingId === post._id ? (
              <>
                <input
                  className="category-input"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                  className="category-input"
                  value={editSlug}
                  onChange={(e) => setEditSlug(e.target.value)}
                />
                <button className="category-btn" onClick={saveEdit}>Spara</button>
              </>
            ) : (
              <>
                <h3>{post.title} <span className="category-link">({post.slug?.current})</span></h3>
                <button className="category-btn" onClick={() => startEdit(post)}>✏️</button>
                <button className="category-btn" onClick={() => deletePost(post._id)}>🗑</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
