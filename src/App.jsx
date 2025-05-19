// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Hem from './pages/Hem';
import Bloggar from './pages/Bloggar';
import Kategori from './pages/Kategori';
import Omoss from './pages/Omoss';
import Home from './Pages/Home';
import SinglePost from './Pages/SinglePost';
import Category from './Pages/Category';
import './App.css';

function App() {
  return (
    <Router>
      <Nav />
      <main className="app-main">
        <Routes>
          {/* Från Daniel */}
          <Route path="/" element={<Hem />} />
          <Route path="/bloggar" element={<Bloggar />} />
          <Route path="/kategori" element={<Kategori />} />
          <Route path="/omoss" element={<Omoss />} />

          {/* Från main */}
          <Route path="/home" element={<Home />} />
          <Route path="/post/:slug" element={<SinglePost />} />
          <Route path="/category/:name" element={<Category />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;