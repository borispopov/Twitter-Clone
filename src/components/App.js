import React, { useState, useEffect } from "react";
import LoginComp from "./LoginComp";
import Twit from "./Twit";
import './App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log('token removed')
    setLoggedIn(false);
}

  return (
    <div className="container">
      {loggedIn ? <Twit handleLogout={handleLogout}/> : <LoginComp setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>}
    </div>
  );
};

export default App;
