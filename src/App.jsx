// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Bloggar from './pages/Bloggar';
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
          <Route path="/" element={<Hem />} />
          <Route path="/bloggar" element={<Bloggar />} />
          <Route path="/category" element={<Kategori />} />
          <Route path="/omoss" element={<Omoss />} />
          <Route path="/home" element={<Home />} />
          <Route path="/post/:slug" element={<SinglePost />} />
          <Route path="/category/:name" element={<Category />} />
        </Routes>
      </main>
    </Router>
  );
}



export default App;