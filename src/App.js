import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`/api/users`, {
      accept: 'application/json',
    })
      .then((response) => response.json())
      .then((data) => {
        let temp = [];
        for (const user of data.list_users) {
          temp.push(user);
          setUsers(temp);
        }
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  }, []);

  console.log(users);
  console.log('users length', users.length);

  return (
    <div className="App">
      <Button variant="primary" className="btn-primary">
        {/* {users[0]._id} */}
      </Button>
    </div>
  );
}
export default App;
