import React, { useEffect } from 'react';
import Login from './components/loginComponent';
import { BrowserRouter, Navigate, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Layout from './components/layout';
import Home from './components/homeComponent';
import AnswerComponent from './components/answerComponent';
import LeaderboardComponent from './components/leaderboardComponent';
import AddQuestionComponent from './components/addQuestionComponent';
import NotFound from './components/NotFound';

export default function App() {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.isLogin);
  const dispatch = useDispatch();
  const location = useLocation();

  // useEffect(() => {
  //   if (!isLogin) {
  //     navigate("/login");
  //   }
  // }, [isLogin, navigate]);

  function RequireAuth({ children }) {
    return isLogin === true ? (
      children
    ) : (
      <Navigate to="/login" replace state={{ path: location.pathname }} />
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="/questions/:question_id" element={<RequireAuth><AnswerComponent /></RequireAuth>} />
        <Route path="/leaderboard" element={<RequireAuth><LeaderboardComponent /></RequireAuth>} />
        <Route path="/add" element={<RequireAuth><AddQuestionComponent /></RequireAuth>} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        {/* Other routes */}
      </Routes>
    </Layout>
  );
}
