import React from 'react'
import "./Widgets.css"
import { TwitterTimelineEmbed, TwitterShareButton, TwitterTweetEmbed,} from "react-twitter-embed";
import SearchIcon from "@material-ui/icons/Search";

function Widgets() {
  return (
    <div className="widgets">
        <div className="widgets__input">
          <SearchIcon className="widgets__searchIcon"/>
          <input placeholder="Search" type="text" />
        </div>

        <div className="widgets__widgetContainer"> 
        <h1>What's New</h1>

          {/* <TwitterTweetEmbed tweetId={"858551177860055040"} /> */}

          <TwitterTimelineEmbed 
            sourceType="profile" 
            screenName="popov009" 
            options={{height:400}} />

          {/* <TwitterShareButton url={"https://facebook.com/cleverprogrammer"} options={{text:"react is awesome", via: "popov009"}} /> */}
        </div>
    </div>
  );
}

export default Widgets;