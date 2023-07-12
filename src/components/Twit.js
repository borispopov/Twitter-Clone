import React from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import './Twit.css';

const Twit = ({handleLogout}) => {
  return (
    //BEM
    <div className="twit">
      <Sidebar
        handleLogout={handleLogout}/>
      <Feed />
      <Widgets />

    </div>
  );
}

export default Twit;
