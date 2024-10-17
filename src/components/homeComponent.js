import React, { useEffect, useState } from 'react';
import Question from './questionComponent';
import { _getQuestions } from '../service/_DATA';
import './style.css';
import { useSelector } from 'react-redux';

const Home = ({ onButtonClick }) => {
  const [questionsData, setQuestions] = useState([]);
  const { isLogin, user } = useSelector((state) => state);

  useEffect(() => {
    const fetchQuestions = async () => {
      const qu = await _getQuestions();
      setQuestions(Object.values(qu));
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
      <div className="question-section">
        <h2 className="question-title">New Questions</h2>
        {newQuestions.length === 0 ? (
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
        )}
      </div>

      <div className="question-section">
        <h2 className="question-title done">Done</h2>
        {doneQuestions.length === 0 ? (
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
        )}
      </div>
    </div>
  );
};

export default Home;
