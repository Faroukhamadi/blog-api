import React from 'react';
import { formatISO9075, parseISO } from 'date-fns';

const Main = (props) => {
  let content = [];

  if (props.posts) {
    content = props.posts.map((post) => (
      <div class="card text-center mb-4">
        <div class="card-body">
          <h5 class="card-title">{post.title}</h5>
          <p class="card-text">{post.content.substr(0, 50)}...</p>
          <a href="#" class="btn btn-primary">
            View Post
          </a>
        </div>
        <div class="card-footer text-muted">
          {formatISO9075(parseISO(post.Date)).substring(0, 10) +
            ' | ' +
            formatISO9075(parseISO(post.Date)).substring(11, 16)}
        </div>
      </div>
    ));
  }
  return <div className="container-fluid">{content}</div>;
};

export default Main;
