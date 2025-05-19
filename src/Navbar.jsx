import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Min Blogg</h1>
      <ul className="nav-links">
        <li><Link to="/">Hem</Link></li>
        <li><Link to="/posts">Inlägg</Link></li>
        <li><Link to="/about">Om oss</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;