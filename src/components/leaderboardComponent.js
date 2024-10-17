import React, { useEffect, useState } from 'react';
import { _getUsers } from '../service/_DATA'; // Adjust import according to your setup
import './style.css'; // Import your CSS file for styling

const LeaderboardComponent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await _getUsers();
      setUsers(Object.values(usersData)); // Convert users object to an array
    };

    fetchUsers();
  }, []);

  return (
    <div className="leaderboard-component">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Answered</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <img src={user.avatarURL} alt={user.name} className="avatar" />
                {user.name}
              </td>
              <td>{Object.keys(user.answers).length}</td>
              <td>{user.questions.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardComponent;
