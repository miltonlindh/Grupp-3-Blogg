import { useState, useEffect } from 'react';
import { client } from '../sanity';

export default function Admin() {
    const [isAdmin, setIsAdmin] = useState(false)
    const [password, setPassword] = useState('')
    const [posts, setPosts] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newSlug, setNewSlug] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editSlug, setEditSlug] = useState('');
    const [categories, setCategories] = useState([]); // 🆕 alla kategorier
    const [selectedCategoryId, setSelectedCategoryId] = useState(''); // 🆕 vald kategori

//check login
    useEffect(() => {
        if (localStorage.getItem('admin') === 'true') {
            setIsAdmin(true);
        }
    }, [])

//hämtar posts om man är admin
    useEffect(() => {
        if (isAdmin) {
            client.fetch(`*[_type == "post"]{_id, title, slug}`).then(setPosts);
            client.fetch(`*[_type == "category"]{_id, title}`).then(setCategories);
        }
    }, [isAdmin]);
//raderar inlägg
    function deletePost(id) {
        const confirmDelete = window.confirm('Villd du ta bort inlägget?');
        if (!confirmDelete) return;

        client.delete(id)
        .then(() => {
            setPosts((prev) => prev.filter((post) => post._id != id));
            alert('inlägg borttaget')
        })
        .catch((err) => console.error('Gick inte att ta bort inlägget', err));
    }
//login
    function handleLogin() {
        if (password === 'hemligt') {
            localStorage.setItem('admin', 'true');
            setIsAdmin(true)
        }else {
            alert('Fel lösenord')
        }
    }
//logga ut
function handleLogout() {
    localStorage.removeItem('admin');
    setIsAdmin(false);
}

//skapar nytt inlägg 
 function createPost() {
    if (!newTitle || !newSlug) return alert('Fyll i både titel och slug');

    const newPost = {
      _type: 'post',
      title: newTitle,
      slug: {
        _type: 'slug',
        current: newSlug,
      },
      categories: selectedCategoryId ? [{
        _type: 'reference',
        _ref: selectedCategoryId
      }] : []
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
//redigerar inlägg
function startEdit(post) {
    setEditingId(post._id);
    setEditTitle(post.title);
    setEditSlug(post.slug.current);
  }
//sparar ändringar i inlägget
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
        setPosts(prev =>
          prev.map(post => post._id === updated._id ? updated : post)
        );
        setEditingId(null);
        setEditTitle('');
        setEditSlug('');
        alert('Inlägg uppdaterat!');
      })
      .catch((err) => console.error('Kunde inte uppdatera:', err));
  }
//visar textbox för lösenord
    if (!isAdmin) {
        return (
          <section>
            <h1>Admin login</h1>
            <input
              type="password"
              placeholder="Skriv lösenord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Logga in</button>
          </section>
        );
      }
      
//adminpanelen där man kan skapa redigera och ta bort inlägg
    return (
         <section>
      <h1>Adminläge</h1>
      <button onClick={handleLogout}>Logga ut</button>

      <h2>Skapa nytt inlägg</h2>
      <input
        placeholder="Titel"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <input
        placeholder="Slug (url-namn)"
        value={newSlug}
        onChange={(e) => setNewSlug(e.target.value)}
      />

      {/* 🆕 Dropdown för kategorier */}
      <select
        value={selectedCategoryId}
        onChange={(e) => setSelectedCategoryId(e.target.value)}
      >
        <option value="">-- Välj kategori --</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.title}
          </option>
        ))}
      </select>

      <button onClick={createPost}>Skapa</button>

      <h2>Alla inlägg</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            {editingId === post._id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                  value={editSlug}
                  onChange={(e) => setEditSlug(e.target.value)}
                />
                <button onClick={saveEdit}>Spara</button>
              </>
            ) : (
              <>
                {post.title} ({post.slug?.current})
                <button onClick={() => startEdit(post)}>✏️</button>
                <button onClick={() => deletePost(post._id)}>🗑</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
    )
}