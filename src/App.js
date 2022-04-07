import { useEffect, useState, createContext } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Post from './components/Post';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Admin from './components/Admin';
import CreatePost from './components/CreatePost';
const AuthenticationContext = createContext();
export { AuthenticationContext };

function App() {
  const [users, setUsers] = useState();
  const [posts, setPosts] = useState();
  const [publishedPosts, setPublishedPosts] = useState();
  const [comments, setComments] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

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
        .catch((err) => {
          console.log('Error: ', err);
        });
    };

    const fetchPublishedPosts = () => {
      fetch('/api/posts/published')
        .then((response) => response.json())
        .then((data) => {
          let temp = [];
          for (const post of data.list_published_posts) {
            temp.push(post);
          }
          setPublishedPosts(temp);
        })
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
        .catch((err) => {
          console.log('Error: ', err);
        });
    };

    fetchUsers();
    fetchPosts();
    fetchPublishedPosts();
    fetchComments();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="app ">
      <AuthenticationContext.Provider value={loggedIn}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route
              exact
              path="/"
              element={<Main publishedPosts={publishedPosts} />}
            />
            <Route path="/:postId" element={<Post posts={posts} />} />
            <Route
              path="/login"
              element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<Admin posts={posts} />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthenticationContext.Provider>
    </div>
  );
}
export default App;
