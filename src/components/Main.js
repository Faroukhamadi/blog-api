import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { formatISO9075, parseISO } from 'date-fns';
import { AuthenticationContext } from '../App';

const Main = (props) => {
  const contextValue = useContext(AuthenticationContext);
  let content;
  if (props.posts) {
    content = props.posts.map((post) => (
      <div className="card text-center mb-4">
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">{post.content.substr(0, 50)}...</p>
          <Link to={`/${post._id}`} className="btn btn-outline-primary">
            View Post
          </Link>
        </div>
        <div className="card-footer text-muted">
          {formatISO9075(parseISO(post.Date)).substring(0, 10) +
            ' | ' +
            formatISO9075(parseISO(post.Date)).substring(11, 16)}
        </div>
      </div>
    ));
  }
  return <div className="container-fluid main">{content}</div>;
};

export default Main;
