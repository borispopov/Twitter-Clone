import React from 'react'
import "./Widgets.css"
import { TwitterTimelineEmbed } from "react-twitter-embed";
import SearchIcon from '@mui/icons-material/Search';

function Widgets() {
  return (
    <div className="widgets">
        <div className="widgets__input">
          <SearchIcon className="widgets__searchIcon"/>
          <input placeholder="Search" type="text" />
        </div>

        <div className="widgets__widgetContainer">
        <h1>What's New</h1>
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="0xbor"
            options={{height:400}} />
        </div>
    </div>
  );
}

export default Widgets;