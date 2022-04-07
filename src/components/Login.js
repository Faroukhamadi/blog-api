import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../App';

const Login = (props) => {
  const contextValue = useContext(AuthenticationContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const login = (data) => {
    fetch('/api/users/login', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Vary: 'Origin',
        'Access-Control-Allow-Credentials': true,
        Connection: 'keep-alive',
        'Keep-Alive': 'timeout=5',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        props.setLoggedIn(true);
        console.log('DATAAAAAAAAAA: ', data);
        navigate('/');
      })
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
