import React, { useEffect, useState } from 'react';
import Question from './questionComponent';
import { _getQuestions } from '../service/_DATA';
import './style.css';
import { useSelector } from 'react-redux';

const Home = ({ onButtonClick }) => {
  const [questionsData, setQuestions] = useState([]);
  const [showAnswered, setShowAnswered] = useState(false); // State to toggle between answered and unanswered
  const { user } = useSelector((state) => state);

  useEffect(() => {
    const fetchQuestions = async () => {
      const qu = await _getQuestions();
      const sortedQuestions = Object.values(qu).sort((a, b) => b.timestamp - a.timestamp);
      setQuestions(Object.values(sortedQuestions));
    };
    fetchQuestions();
  }, []);

  const newQuestions = questionsData.filter((qu) =>
    (qu.optionOne && qu.optionOne.votes && !qu.optionOne.votes.includes(user.id)) ||
    (qu.optionTwo && qu.optionTwo.votes && qu.optionTwo.votes.includes(user.id))
  );

  const doneQuestions = questionsData.filter((qu) =>
    (qu.optionOne && qu.optionOne.votes && qu.optionOne.votes.includes(user.id)) &&
    (qu.optionTwo && qu.optionTwo.votes && !qu.optionTwo.votes.includes(user.id))
  );

  return (
    <div className="question-list">
      <div className="toggle-buttons">
        <button 
          className={`toggle-button ${!showAnswered ? 'active' : ''}`} 
          onClick={() => setShowAnswered(false)}
        >
          Unanswered Questions
        </button>
        <button 
          className={`toggle-button ${showAnswered ? 'active' : ''}`} 
          onClick={() => setShowAnswered(true)}
        >
          Answered Questions
        </button>
      </div>

      <div className="question-section">
        <h2 className="question-title">{showAnswered ? "Answered Questions" : "New Questions"}</h2>
        {showAnswered ? (
          doneQuestions.length === 0 ? (
            <p>No questions marked as done.</p>
          ) : (
            <div className="question-grid">
              {doneQuestions.map((question, index) => (
                <div className="question-card" key={index}>
                  <Question
                    option={question.optionOne.votes.includes(user.id) ? "1" : "2"}
                    isAnswer={true}
                    qu={question}
                    author={question.author}
                    dateTime={question.timestamp}
                    onButtonClick={() => onButtonClick(question.id)}
                  />
                </div>
              ))}
            </div>
          )
        ) : (
          newQuestions.length === 0 ? (
            <p>No new questions available.</p>
          ) : (
            <div className="question-grid">
              {newQuestions.map((question, index) => (
                <div className="question-card" key={index}>
                  <Question
                    option=""
                    isAnswer={false}
                    qu={question}
                    author={question.author}
                    dateTime={question.timestamp}
                    onButtonClick={() => onButtonClick(question.id)}
                  />
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
