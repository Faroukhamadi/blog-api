import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthenticationContext } from '../App';

const Header = () => {
  const contextValue = useContext(AuthenticationContext);
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
        {!contextValue && (
          <>
            <li>
              <a href="/login">Log In</a>
            </li>
            <li>
              <a href="/signup">Sign Up</a>
            </li>
          </>
        )}
        {contextValue && (
          <li>
            <a
              href="/"
              onClick={() => {
                fetch('/api/users/logout', {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                })
                  .then((response) => {
                    return response.json();
                  })
                  .then((data) => {
                    console.log('DATAAAAAAAAAA: ', data);
                  })
                  .catch((err) => {
                    console.log('Error: ', err);
                  });
              }}
            >
              Logout
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Header;
