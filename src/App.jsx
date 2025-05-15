// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Hem from './pages/Hem';
import Bloggar from './pages/Bloggar';
import Kategori from './pages/Kategori';
import Omoss from './pages/Omoss';
import './App.css';

function App() {
  return (
    <Router>
      <Nav />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Hem />} />
          <Route path="/bloggar" element={<Bloggar />} />
          <Route path="/kategori" element={<Kategori />} />
          <Route path="/omoss" element={<Omoss />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;