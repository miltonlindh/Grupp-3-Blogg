// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './Pages/Admin'
import Nav from './components/Nav';
import Omoss from './pages/Omoss';
import Home from './Pages/Home';
import SinglePost from './Pages/SinglePost';
import Category from './Pages/Category';

function App() {
  return (
    <Router>
      <Nav />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/omoss" element={<Omoss />} />
          <Route path="/post/:slug" element={<SinglePost />} />
          <Route path="/category/:name" element={<Category />} />
          <Route path="/category" element={<Category />} />
<Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </Router>
  );
}



export default App;