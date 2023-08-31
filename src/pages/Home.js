import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Widgets from "../components/Widgets";
import './Home.css';
import { useRef } from "react";

const Home = ({ handleLogout, loggedIn }) => {
  const tweetRef = useRef(null)
  return (
    //BEM
    <div className="home">
      <Sidebar
        tweetRef={tweetRef}
        handleLogout={handleLogout}
        loggedIn={loggedIn} />
      <Feed
        tweetRef={tweetRef}
        loggedIn={loggedIn}
        />
      <Widgets />

    </div>
  );
}

export default Home;
