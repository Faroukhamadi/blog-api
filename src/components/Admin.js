import React from 'react';
import { formatISO9075, parseISO } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';

const Admin = (props) => {
  const navigate = useNavigate();
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
          {post.isPublished ? (
            <button
              type="button"
              className="btn btn-outline-warning m-2"
              onClick={() => {
                fetch(`/api/posts/${post._id}`, {
                  method: 'PUT',
                });
                navigate('/admin');
              }}
            >
              Unpublish
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-outline-success m-2"
              onClick={() => {
                fetch(`/api/posts/${post._id}`, {
                  method: 'PUT',
                });
                navigate('/admin');
              }}
            >
              Publish
            </button>
          )}
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => {
              fetch(`/api/posts/${post._id}`, {
                method: 'DELETE',
              });
              navigate('/admin');
            }}
          >
            Delete
          </button>
        </div>
        <div className="card-footer text-muted">
          {formatISO9075(parseISO(post.Date)).substring(0, 10) +
            ' | ' +
            formatISO9075(parseISO(post.Date)).substring(11, 16)}
        </div>
      </div>
    ));
  }
  return <div className="admin">{content}</div>;
};

export default Admin;
