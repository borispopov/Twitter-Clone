import React from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import './App.css';

const App = ({handleLogout}) => {
  return (
    //BEM
    <div className="app">
      <Sidebar
        handleLogout={handleLogout}/>
      <Feed />
      <Widgets />

    </div>
  );
}

export default App;
