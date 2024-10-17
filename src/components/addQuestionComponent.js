import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { _saveQuestion } from '../service/_DATA';
import { useNavigate } from 'react-router-dom';
import './style.css'; // Import your CSS file for styling

const AddQuestionComponent = () => {
  const [optionOneText, setOptionOneText] = useState('');
  const [optionTwoText, setOptionTwoText] = useState('');
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("user when add: ", user)
    try {
      await _saveQuestion({
        optionOneText,
        optionTwoText,
        author: user.id,
      });
      navigate('/');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="add-question-container">
      <h2 className="add-question-title">Add a New Question</h2>
      <form className="add-question-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Option One</label>
          <input
            type="text"
            value={optionOneText}
            onChange={(e) => setOptionOneText(e.target.value)}
            placeholder="Enter option one text"
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Option Two</label>
          <input
            type="text"
            value={optionTwoText}
            onChange={(e) => setOptionTwoText(e.target.value)}
            placeholder="Enter option two text"
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default AddQuestionComponent;
