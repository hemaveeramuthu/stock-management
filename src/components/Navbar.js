// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
      <li><Link to="/">Home</Link></li>
        <li><Link to="/hollow-bricks">Hollow Bricks</Link></li>
        <li><Link to="/cement">Cement</Link></li>
        <li><Link to="/msand">Msand</Link></li>
        <li><Link to="/psand">Psand</Link></li>
        <li><Link to="/chips">Chips</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
