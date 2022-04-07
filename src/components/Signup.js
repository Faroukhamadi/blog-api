import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const signup = (data) => {
    fetch('/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => console.log('DATAAAAAAAAAA: ', data))
      .catch((err) => {
        console.log('Error: ', err);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    signup({
      username: username,
      password: password,
    });
    navigate('/login', { replace: true });
  };

  return (
    <div className="signup">
      <form onSubmit={handleSubmit}>
        <h1 className="display-3 text-center">Signup Page</h1>
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

export default Signup;
