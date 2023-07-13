import React, { useState, useEffect } from "react";
import LoginComp from "./LoginComp";
import Twit from "./Twit";
import './App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    console.log('token removed')
    setLoggedIn(false);
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) setLoggedIn(true);
  }, [loggedIn])

  console.log('loggedin?: ' + loggedIn)

  return (
    <div className="container">
      {loggedIn ?
        <Twit handleLogout={handleLogout}/>
        :
        <LoginComp setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
      }
    </div>
  );
};

export default App;
