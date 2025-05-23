// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Bloggar from './pages/Bloggar';
import Omoss from './pages/Omoss';
import Home from './Pages/Home';
import SinglePost from './Pages/SinglePost';
import Category from './Pages/Category';
import PostDetail from "./pages/PostDetail";
import HeaderFooter from "./components/layout/HeaderFooter";
import './App.css';

function App() {
  return (
    <Router>
      <Nav />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bloggar" element={<Bloggar />} />
          <Route path="/omoss" element={<Omoss />} />
          <Route path="/post/:slug" element={<SinglePost />} />
          <Route path="/category/:name" element={<Category />} />
        </Routes>
      </main>
    </Router>
  );
}



export default App;