import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header">
      <h1>
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            color: '#212529',
          }}
        >
          Daily Farouk
        </Link>
      </h1>
      <ul>
        <li>
          <a href="/login">Log In</a>
        </li>
        <li>
          <a href="/signup">Sign Up</a>
        </li>
      </ul>
    </div>
  );
};

export default Header;
