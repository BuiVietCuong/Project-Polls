import React from 'react';
import './style.css'; // Import your CSS file for styling
import { useNavigate } from 'react-router-dom';

const Question = ({ option, isAnswer, qu, author, dateTime }) => {
  const navigate = useNavigate();

  // Convert epoch time to a readable format
  const formattedDate = new Date(dateTime).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',  // Abbreviated month
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true     // 12-hour format
  });

  const handleButtonClick = () => {
    navigate(`/answer/${qu.id}`, { state: { isAnswer: isAnswer, option: option } }); // Pass additional parameters in state
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>{author}</h3>
      </div>
      <div className="card-body">
        <p>{formattedDate}</p>
      </div>
      <div className="card-footer">
        <button 
          onClick={() => handleButtonClick()} 
          className="card-button" // Disable button if isAnswer is true
        >
          Show
        </button>
      </div>
    </div>
  );
};

export default Question;
