import React, { useEffect, useState } from 'react';
import { _getUsers } from '../service/_DATA'; // Adjust import according to your setup
import './style.css'; // Import your CSS file for styling

const LeaderboardComponent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await _getUsers();
      const usersArray = Object.values(usersData).map(user => ({
        ...user,
        score: Object.keys(user.answers).length + user.questions.length, // Calculate score
      }));

      // Sort users by score in descending order
      usersArray.sort((a, b) => b.score - a.score);

      setUsers(usersArray); // Set the sorted users
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
