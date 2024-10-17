import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { _getQuestions, _getUsers, _saveQuestionAnswer } from '../service/_DATA'; 
import "./style.css";
import { useSelector } from 'react-redux';

const AnswerComponent = () => {
  const { question_id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const location = useLocation();
  const { state } = location; 
  const user = useSelector((state) => state.user);
  const { isAnswer } = state || {};
  const [selectedOption, setSelectedOption] = useState(null); 

  useEffect(() => {
    const fetchQuestionAndUsers = async () => {
      const questions = await _getQuestions();
      const users = await _getUsers();

      const fetchedQuestion = questions[question_id]; 
      if (!fetchedQuestion) {
        navigate("/404");
        return;
      }

      const authorAvatar = users[fetchedQuestion.author].avatarURL;
      setQuestion({ ...fetchedQuestion, authorAvatar });
    };

    fetchQuestionAndUsers();
  }, [question_id, navigate]);

  const calculatePercentage = (option) => {
    const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;
    if (totalVotes === 0) return 0; 
    return ((option.votes.length / totalVotes) * 100).toFixed(2); 
  };

  const onAnswerSelect = async (selectedOption) => {
    try {
      await _saveQuestionAnswer({
        authedUser: user.id, 
        qid: question_id, 
        answer: selectedOption 
      });

      setQuestion((prev) => ({
        ...prev,
        [selectedOption]: {
          ...prev[selectedOption],
          votes: prev[selectedOption].votes.concat(user.id),
        },
      }));
      setSelectedOption(selectedOption); 
    } catch (error) {
      console.error("Error saving answer:", error);
    }
  };

  if (!question) {
    return <></>;
  }

  const isOptionSelected = selectedOption !== null || isAnswer;

  return (
    <div className="answer-component">
      {/* Poll creator section */}
      <div className="poll-creator">
        <img src={question.authorAvatar} alt={`${question.author} avatar`} className="creator-avatar" />
        <div className="creator-info">
          <h4 className="creator-name">{question.author}</h4>
          <p className="creator-text">Would you rather...</p>
        </div>
      </div>

      <h3 className="poll-question">{question.optionOne.text} or {question.optionTwo.text}?</h3>

      <div className="options-container">
        <div className="option-card" style={{ backgroundColor: isAnswer ? (question.optionOne.votes.includes(user.id) ? 'lightgreen' : '') : '' }}>
          <h4>{question.optionOne.text}</h4>
          <button 
            onClick={() => onAnswerSelect("optionOne")} 
            className="option-button" 
            disabled={isOptionSelected}
          >
            Select
          </button>
          {selectedOption === "optionOne" && !isAnswer && (
            <p>{`${calculatePercentage(question.optionOne)}% of people voted for this option`}</p>
          )}
          {isAnswer && (
            <p>{`${calculatePercentage(question.optionOne)}% of people voted for this option`}</p>
          )}
        </div>
        <div className="option-card" style={{ backgroundColor: isAnswer ? (question.optionTwo.votes.includes(user.id) ? 'lightgreen' : '') : '' }}>
          <h4>{question.optionTwo.text}</h4>
          <button 
            onClick={() => onAnswerSelect("optionTwo")} 
            className="option-button" 
            disabled={isOptionSelected}
          >
            Select
          </button>
          {selectedOption === "optionTwo" && !isAnswer && (
            <p>{`${calculatePercentage(question.optionTwo)}% of people voted for this option`}</p>
          )}
          {isAnswer && (
            <p>{`${calculatePercentage(question.optionTwo)}% of people voted for this option`}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnswerComponent;
