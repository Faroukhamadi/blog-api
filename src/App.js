import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import './App.css';

function App() {
  const [users, setUsers] = useState();
  const [posts, setPosts] = useState();
  const [comments, setComments] = useState();

  useEffect(() => {
    const fetchUsers = () => {
      return fetch('/api/users')
        .then((response) => response.json())
        .then((data) => {
          let temp = [];
          for (const user of data.list_users) {
            temp.push(user);
            setUsers(temp);
          }
        })
        .then(() => console.log(users))
        .catch((err) => {
          console.log('Error: ', err);
        });
    };

    const fetchPosts = () => {
      return fetch('/api/posts', {
        method: '',
      })
        .then((response) => response.json())
        .then((data) => {
          let temp = [];
          for (const post of data.list_posts) {
            temp.push(post);
            setPosts(temp);
          }
        })
        .then(() => console.log(posts))
        .catch((err) => {
          console.log('Error: ', err);
        });
    };

    const fetchComments = () => {
      return fetch('/api/users/comments')
        .then((response) => response.json())
        .then((data) => {
          let temp = [];
          for (const comment of data.list_comments) {
            temp.push(comment);
            setComments(temp);
          }
        })
        .then(() => console.log(comments))
        .catch((err) => {
          console.log('Error: ', err);
        });
    };
    fetchUsers();
    fetchPosts();
    fetchComments();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // hey;
  return (
    <div className="App">
      <Button variant="primary" className="btn-primary">
        Let's go
      </Button>
    </div>
  );
}
export default App;
