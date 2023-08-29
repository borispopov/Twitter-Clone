import React, { useState, useEffect } from "react";
import LoginComp from "./LoginComp";
import Twit from "./Twit";
import './App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem('avatar');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('uid');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');

    setLoggedIn(false);
  }

  useEffect(() => {
    sessionStorage.getItem('token') ? setLoggedIn(true) : setLoggedIn(false)
  })

  return (
    <div className="container">
      {loggedIn ? (
        <Twit handleLogout={handleLogout}/>
      ) : (
        <LoginComp setLoggedIn={setLoggedIn} />
      )}
    </div>
  );
};

export default App;
