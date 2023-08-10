import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_USERS, GET_ONE_USER } from './query';
import { CREATE_USER } from './mutation';
import { useState } from 'react';

function App() {
  const { loading, error, data, refetch } = useQuery(GET_ALL_USERS);
  const [id, setId] = useState();

  const { data: userData } = useQuery(GET_ONE_USER, {
    variables: {
      id
    }
  });
  const [newUser] = useMutation(CREATE_USER);
  const [username, setUsername] = useState();
  const [age, setAge] = useState();

  if (loading && !data) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const addUser = (e) => {
    e.preventDefault();
    newUser({
      variables: {
        user: {
          username,
          age: +age,
        }
      }
    }).then(() => refetch());
    setUsername("");
    setAge("");
  };

  return (
    <main>
      <button onClick={() => window.location.href = "http://localhost:5000/graphql"}>Open graphiQL</button>
      <h2>Users:</h2>
      <ul>
        {data.getAllUsers.map((user) => (
          <>
            <li key={user.id}>
              <span>Name: <strong>{user.username}</strong></span><br />
              <span>Age: {user.age}</span><br />
              <span>Id: {user.id}</span>
              <div>
                {user.posts?.map((post) => (
                  <>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                  </>
                ))}
              </div>
            </li>
            <br />
          </>
        ))}
      </ul>
      <div>
        <h2>Add user:</h2>
        <form onSubmit={addUser}>
          <input required placeholder='Name' value={username} onChange={(e) => setUsername(e.target.value)} />
          <input required placeholder='Age' value={age} type='number' onChange={(e) => setAge(e.target.value)} />
          <button>Add user</button>
        </form>

      </div>
      <div>
        <h2>Find user:</h2>
        <input type='number' placeholder='User id' onChange={(e) => setId(e.target.value)} />
        <h4>{userData?.getUser
          ? <>
            <span>Name: <strong>{userData.getUser.username}</strong></span><br />
            <span>Age: {userData.getUser.age}</span><br />
          </>
          : id && `user with id:${id} not found`}</h4>
      </div>
    </main>
  );
};
export default App;