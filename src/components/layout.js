import React from 'react';
import './style.css'; // Import your CSS file for styling
import { LOG_OUT } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; // Import Link

const Layout = ({ children }) => {
  const { isLogin, user } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onLogout() {
    dispatch({ type: LOG_OUT });
    navigate("/login");
  }

  return (
    <div className="layout">
      {isLogin && (
        <nav className="navbar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/leaderboard">LeaderBoard</Link></li>
            <li><Link to="/add">New</Link></li>
          </ul>
          <div className="user-info">
            {user ? (
              <>
                <img src={user.avatarURL} alt="User Avatar" className="user-avatar" />
                <span className="user-name">{user.name}</span>
                <button onClick={onLogout} className="logout-button">Logout</button>
              </>
            ) : (
              <span>Please log in</span>
            )}
          </div>
        </nav>
      )}
      {children}
    </div>
  );
};


export default Layout;
