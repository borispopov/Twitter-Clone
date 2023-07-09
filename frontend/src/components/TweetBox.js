import React, {useState} from 'react'
import "./TweetBox.css"
import { Avatar, Button } from "@material-ui/core";
import db from "./firebase";
import { serverTimestamp} from 'firebase/firestore';

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState ("");
  const [tweetImage, setTweetImage] = useState ("");
  const time = {timestamp: serverTimestamp() };

  const sendTweet = e => {
    e.preventDefault();

    if(tweetMessage !=="") {
      
    db.collection("posts").add({
      displayName: "Boris Popov",
      username: "popov",
      verified: true,
      text: tweetMessage,
      image: tweetImage,
      avatar: "https://sloanreview.mit.edu/wp-content/uploads/2019/07/FL-Ready-Curiosity-Leadership-2400-1.jpg",
      time: time
    });

    setTweetMessage("");
    setTweetImage("");

  };
};

  return (
    <div className="tweetBox">
        <form>
            <div className="tweetBox__input">
                <Avatar src="https://sloanreview.mit.edu/wp-content/uploads/2019/07/FL-Ready-Curiosity-Leadership-2400-1.jpg"/>
                <input 
                  onChange={e => setTweetMessage(e.target.value)} 
                  value={tweetMessage}
                  placeholder="What's happening?" 
                  type="text"/>
            </div>
            <input 
              value={tweetImage} 
              onChange={e => setTweetImage(e.target.value)} 
              className="tweetBox__ImageInput" 
              placeholder="Optional: Enter Image URL" 
              type="text"/>

            <Button 
              onClick={sendTweet} 
              type="submit" 
              className="tweetBox__tweetButton">Tweet
            </Button>
        </form>
    </div>
  );
}

export default TweetBox;