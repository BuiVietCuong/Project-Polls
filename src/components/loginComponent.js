import React, { useState, useEffect } from 'react';
import { _getUsers } from '../service/_DATA';
import { useDispatch } from 'react-redux';
import { LOG_IN } from '../actions';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]); // State to hold user data
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await _getUsers();
      setUsers(Object.values(usersData)); // Store users as an array
    };
    fetchUsers();
  }, []);

  const handleUserSelect = (user) => {
    setUsername(user.id); // Assuming user.id is the username
    setPassword(user.password); // Assuming you have access to the password
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password');
    } else {
      const usersData = await _getUsers();
      let temp_user = usersData[username];
      if (temp_user && temp_user.password === password) {
        dispatch({
          type: LOG_IN,
          payload: temp_user,
        });
        navigate(state?.path || "/");
      } else {
        setError('Invalid username or password');
      }
    }

    setUsername('');
    setPassword('');
    setError('');
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Select User:</label>
          <select onChange={(e) => handleUserSelect(users[e.target.selectedIndex - 1])} style={styles.select}>
            <option value="">Select a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name} <img src={user.avatarURL} alt={user.name} style={styles.avatar} />
              </option>
            ))}
          </select>
        </div>
        <div style={styles.inputGroup}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  select: {
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  avatar: {
    width: '20px',
    height: '20px',
    marginLeft: '5px',
  },
  error: {
    color: 'red',
  },
};

export default Login;
