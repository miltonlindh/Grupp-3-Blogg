import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

export default function Nav() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
            Home
          </NavLink>
        </li>
      <li>
        <NavLink to="/category" className={({ isActive }) => isActive ? 'active' : ''}>
          Kategori
        </NavLink>
      </li>
      <li>
        <NavLink to="/omoss" className={({ isActive }) => isActive ? 'active' : ''}>
          Omoss
        </NavLink>
      </li>
      <li>
        <NavLink to="/admin" className={({ isActive }) => isActive ? 'active' : ''}>
          Admin
        </NavLink>
      </li>
    </ul>
  </nav>
);
}