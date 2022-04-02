import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatISO9075, parseISO } from 'date-fns';

const Post = (props) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState();
  let { postId } = useParams();
  useEffect(() => {
    const fetchComments = () => {
      fetch(`/api/posts/post/${postId}`)
        .then((response) => response.json())
        .then((data) => {
          let temp = [];
          for (const value of data.comments.comments) {
            temp.push(value);
          }
          setComments(temp);
        })
        .then(() => console.log('This is comments state: ', comments))
        .catch((err) => {
          console.log('Error: ', err);
        });
    };
    fetchComments();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
    console.log(comment);
  };

  let commentContent;
  if (comments) {
    commentContent = comments.map((c) => (
      <>
        <div className="card">
          <div className="card-body">
            <blockquote className="blockquote mb-0">
              <p>{c.content}</p>
              <footer className="blockquote-footer">
                Written by <cite title="Source Title">Farouk Hamadi </cite>
                <br />
                Commented on
                <cite title="Source Title">
                  {' ' +
                    formatISO9075(parseISO(c.Date)).substring(0, 10) +
                    ' | ' +
                    formatISO9075(parseISO(c.Date)).substring(11, 16)}
                </cite>
              </footer>
            </blockquote>
          </div>
        </div>
      </>
    ));
  }

  let post = undefined;
  let content;
  if (props.posts) {
    post = props.posts.find((p) => p._id === postId);
    content = (
      <>
        <h1 className="display-3">{post.title}</h1>
        <p className="text-muted">
          <span className="fst-italic">Posted on </span>
          {formatISO9075(parseISO(post.Date)).substring(0, 10)}
        </p>
        <p className="lead">{post.content}</p>
      </>
    );
  }

  return (
    <div className="post">
      {content ? content : <h1>Loading...</h1>}
      {commentContent ? (
        <>
          {commentContent}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:{' '}
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="form-control"
                id="name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="comment" className="form-label">
                Comment:{' '}
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="form-control"
                id="comment"
                rows="3"
              ></textarea>
            </div>
            <button className="btn btn-outline-primary" type="submit">
              Send
            </button>
          </form>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Post;
