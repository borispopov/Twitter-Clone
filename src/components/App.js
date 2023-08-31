import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import jwt_decode from 'jwt-decode';
import Login from "../pages/Login";
import Home from "../pages/Home";
import './App.css';
import Profile from "../pages/Profile";

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

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const decoded = jwt_decode(localStorage.getItem('token'))
      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (decoded.exp < currentTimestamp) {
        localStorage.removeItem('token');
        setLoggedIn(false);
      } else {
        console.log('Token is still valid');
      }
    }
  }, [])

  useEffect(() => {
    if (!loggedIn){
      sessionStorage.removeItem('avatar')
      sessionStorage.removeItem('name')
      sessionStorage.removeItem('username')
      sessionStorage.removeItem('email')
      sessionStorage.removeItem('uid')
    }
  }, [loggedIn])

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home handleLogout={handleLogout} loggedIn={loggedIn}/>}/>
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/profile" element={<Profile handleLogout={handleLogout} loggedIn={loggedIn} />} />
      </Routes>
    </Router>
  );
};

export default App;
