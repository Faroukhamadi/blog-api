import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuth = () => {
      fetch('/api/checkauthentication', {
        credentials: 'include',
        mode: 'no-cors',
      })
        // .then(() => console.log('fetching auth status'))
        .then((response) => response.json())
        .then((data) => {
          //  setLoggedIn(data.authenticated);
          console.log('yes', data);
        });
    };
    fetchAuth();
  }, [isLoggedIn]);

  const login = (data) => {
    fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })
      .then((response) => response.json())
      .then(setIsLoggedIn(!isLoggedIn))
      .then((data) => console.log('DATAAAAAAAAAA: ', data))
      .catch((err) => {
        console.log('Error: ', err);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      username: username,
      password: password,
    });
  };

  return (
    <div className="login">
      <h1 className="display-3 text-center">Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            aria-describedby="usernamehelp"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div id="usernamehelp" className="form-text">
            We'll never share your Username with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-outline-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
