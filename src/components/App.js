import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from "../pages/Login";
import Home from "../pages/Home";
import './App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') ? true : false);

  const handleLogout = () => {
    sessionStorage.removeItem('avatar');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('uid');
    sessionStorage.removeItem('username');
    localStorage.removeItem('token');

    window.location.href = '/login'

    setLoggedIn(false);
  }

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home handleLogout={handleLogout} loggedIn={loggedIn}/>}/>
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route />
      </Routes>
    </Router>
  );
};

export default App;
