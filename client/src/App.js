import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_USERS } from './query';
import { CREATE_USER } from './mutation';
import { useState } from 'react';

function App() {
  const { loading, error, data } = useQuery(GET_ALL_USERS);
  const [newUser] = useMutation(CREATE_USER);
  const [username, setUsername] = useState();
  const [age, setAge] = useState();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const addUser = () => {
    newUser({
      variables: {
        user: {
          username,
          age: +age,
        }
      }
    }).then((e) => console.log(e));
  };

  return (
    <main>
      <ul>
        {data.getAllUsers.map((user) => (
          <li key={user.id}>
            <span>Name: <strong>{user.username}</strong></span><br />
            <span>Age: {user.age}</span>
            <div>
              {user.posts?.map((post) => (
                <>
                  <h2>{post.title}</h2>
                  <p>{post.content}</p>
                </>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <div>
        <input placeholder='Name' onChange={(e) => setUsername(e.target.value)} />
        <input placeholder='Age' type='number' onChange={(e) => setAge(e.target.value)} />
        <button onClick={addUser}>Add user</button>
      </div>
    </main>
  );
}

export default App;