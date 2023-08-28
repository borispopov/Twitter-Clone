import React from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import './Twit.css';
import { useRef } from "react";

const Twit = ({ handleLogout }) => {
  const tweetRef = useRef(null)

  return (
    //BEM
    <div className="twit">
      <Sidebar
        tweetRef={tweetRef}
        handleLogout={handleLogout}/>
      <Feed
        tweetRef={tweetRef}/>
      <Widgets />

    </div>
  );
}

export default Twit;
