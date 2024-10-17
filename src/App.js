import React, { useEffect } from 'react';
import Login from './components/loginComponent';
import { BrowserRouter, json, Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Layout from './components/layout';
import Home from './components/homeComponent';
import AnswerComponent from './components/answerComponent';
import LeaderboardComponent from './components/leaderboardComponent';
import AddQuestionComponent from './components/addQuestionComponent';
import { LOG_IN } from './actions';
import NotFound from './components/NotFound';

export default function App() {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.isLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLogin) {
      const local_login = JSON.parse(localStorage.getItem("is_login"))
      if (local_login) {
        dispatch({
          type: LOG_IN,
          payload: local_login 
      })
      } else {
        navigate("/login");
      }
    }
  }, [isLogin, navigate]); // Added navigate as a dependency

  return (
    <Layout>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/answer/:id" element={<AnswerComponent />} />
        <Route path="/leaderboard" element={<LeaderboardComponent />} />
        <Route path="/new" element={<AddQuestionComponent />} />
        <Route path="/404" element={<NotFound />} />
        // {/* Other routes */}
      </Routes>
    </Layout>
  );
}
