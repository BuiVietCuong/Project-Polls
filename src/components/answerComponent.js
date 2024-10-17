import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate, redirect } from 'react-router-dom';
import { _getQuestions, _saveQuestionAnswer } from '../service/_DATA'; // Adjust import according to your setup
import "./style.css";
import { useSelector } from 'react-redux';

const AnswerComponent = () => {
  const { id } = useParams(); // Get the question ID from the URL
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const location = useLocation();
  const { state } = location; // Get the state passed from navigation
  const option = state?.option; // Assuming 'option' is passed to determine the correct option
  const user = useSelector((state) => state.user); // Assuming 'user' contains the logged-in user's information

  useEffect(() => {
    const fetchQuestion = async () => {
      const questions = await _getQuestions();
      const fetchedQuestion = questions[id]; // Assuming questions is an object
      console.log("fetchedQuestion ==============: ", fetchedQuestion)
      if (!fetchedQuestion) {
        navigate("/404")
      }
      setQuestion(fetchedQuestion);
    };

    fetchQuestion();
  }, [id]);

  const onAnswerSelect = async (selectedOption) => {
    try {
      // Ensure you pass the correct arguments to _saveQuestionAnswer
      await _saveQuestionAnswer({
        authedUser: user.id, // User ID
        qid: id, // Question ID
        answer: selectedOption // 'optionOne' or 'optionTwo'
      });
      navigate("/"); // Navigate after saving the answer
    } catch (error) {
      console.error("Error saving answer:", error);
    }
  };


//   const { optionOne, optionTwo } = question;
  if (!question) {
    return <></>
  }
  return (
    <div className="answer-component">
      <h3>Choose an Option</h3>
      <div className="option-card">
        <h4 style={{ color: option === "1" ? 'green' : 'black' }}>
          {question.optionOne.text}
        </h4>
        <button 
          onClick={() => onAnswerSelect("optionOne")} 
          className="option-button" 
          disabled={state?.isAnswer} // Disable if isAnswered is true
        >
          Select
        </button>
      </div>
      <div className="option-card">
        <h4 style={{ color: option === "2" ? 'green' : 'black' }}>
          {question.optionTwo.text}
        </h4>
        <button 
          onClick={() => onAnswerSelect("optionTwo")} 
          className="option-button" 
          disabled={state?.isAnswer} // Disable if isAnswered is true
        >
          Select
        </button>
      </div>
    </div>
  );
};

export default AnswerComponent;
