import {useEffect, useState} from 'react'
import "./TweetBox.css"
import { Avatar, Button } from "@mui/material";

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState ("");
  const [tweetImage, setTweetImage] = useState ("");
  const [ avatar, setAvatar ] = useState(sessionStorage.getItem('avatar'))

  const sendTweet = e => {
    e.preventDefault();

    if(tweetMessage !=="") {

      setTweetMessage("");
      setTweetImage("");

    };
  };

  window.addEventListener('storage', () => {
    setAvatar(sessionStorage.getItem('avatar'))
  })

return (
  <div className="tweetBox">
      <form>
          <div className="tweetBox__input">
              <Avatar src={avatar}/>
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
)};

export default TweetBox;