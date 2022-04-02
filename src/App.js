import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [users, setUsers] = useState();
  const [posts, setPosts] = useState();
  const [comments, setComments] = useState();

  useEffect(() => {
    const fetchUsers = () => {
      console.log('run1');
      fetch('/api/users')
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
      console.log('run2');
      fetch('/api/posts')
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
      console.log('run3');
      fetch('/api/users/comments')
        .then((response) => response.json())
        .then((data) => {
          let temp = [];
          for (const comment of data.list_comments) {
            temp.push(comment);
            setComments(temp);
          }
        })
        .then(() => console.log('yikes' + comments))
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
    <div className="app ">
      <Header />
      <Main posts={posts} />
      <Footer />
    </div>
  );
}
export default App;
