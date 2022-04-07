import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePost = (data) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const create_post = (data) => {
    fetch('/api/posts', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log('Error: ', err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    create_post({
      title: title,
      content: content,
      Date: new Date(),
    });
    navigate('/');
  };

  return (
    <div className="create-post">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label display-6">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="titlehelp"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div id="titlehelp" className="form-text">
            We'll never share your title with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label display-6">
            Content
          </label>
          <textarea
            type="content"
            className="form-control"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-outline-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
