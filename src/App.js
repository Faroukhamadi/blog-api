import { useEffect, useState } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Post from './components/Post';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [users, setUsers] = useState();
  const [posts, setPosts] = useState();
  const [comments, setComments] = useState();

  useEffect(() => {
    const fetchUsers = () => {
      fetch('/api/users')
        .then((response) => response.json())
        .then((data) => {
          let temp = [];
          for (const user of data.list_users) {
            temp.push(user);
          }
          setUsers(temp);
        })
        .then(() => console.log(users))
        .catch((err) => {
          console.log('Error: ', err);
        });
    };

    const fetchPosts = () => {
      fetch('/api/posts')
        .then((response) => response.json())
        .then((data) => {
          let temp = [];
          for (const post of data.list_posts) {
            temp.push(post);
          }
          setPosts(temp);
        })
        .then(() => console.log(posts))
        .catch((err) => {
          console.log('Error: ', err);
        });
    };

    const fetchComments = () => {
      fetch('/api/users/comments')
        .then((response) => response.json())
        .then((data) => {
          let temp = [];
          for (const comment of data.list_comments) {
            temp.push(comment);
          }
          setComments(temp);
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
  return (
    <div className="app ">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Main posts={posts} />} />
          <Route path="/:postId" element={<Post posts={posts} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;
