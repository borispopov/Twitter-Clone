import {useEffect, useState, useRef} from 'react'
import "./TweetBox.css"
import { Avatar, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import axios from 'axios';

function TweetBox({ tweetRef, handleFeed, loggedIn }) {

  const [ tweetMessage, setTweetMessage ] = useState ("");
  const [ tweetImage, setTweetImage ] = useState ();
  const [ avatar, setAvatar ] = useState(sessionStorage.getItem('avatar'))
  const [ file, setFile ] = useState()
  const inputRef = useRef(null);

  const sendTweet = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('image', file);
    formData.append('key', sessionStorage.getItem('uid'));
    formData.append('description', tweetMessage)

    const posted = await axios.post('http://localhost:5000/post', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }})
    console.log('posted: ', posted)
    await handleFeed()
    setTweetImage()
    setTweetMessage('')
  }

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    const reader = new FileReader();
    reader.onloadend = () => {
      setTweetImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  window.addEventListener('storage', () => {
    setAvatar(sessionStorage.getItem('avatar'))
  })

return (
  <div className="tweetBox">
      <form>
          <div className="tweetBox__input">
            <Avatar src={avatar}/>
            <input
              ref={tweetRef}
              accept='image/'
              value={tweetMessage}
              placeholder="What's happening?"
              type="text"
              onChange={e => {setTweetMessage(e.target.value)}} />
          </div>
          <div className='input__container'>
            <div className="input__icon" onClick={() => {
              inputRef.current.click();
            }}>

              <PhotoSizeSelectActualOutlinedIcon />
              <input
                ref={inputRef}
                type='file'
                className="tweetBox__ImageInput"
                accept="image/"
                onChange={handleFile} />

            </div>
            <Button
              onClick={async (e) => {
                await sendTweet(e);
                setTweetImage('')
                setFile('')
              }}
              type="submit"
              className="tweetBox__tweetButton"
              disabled={!tweetImage && !tweetMessage || !loggedIn} >Tweet</Button>
          </div>
          <div className="preview">
            {tweetImage ? (
              <>
                <CloseIcon
                  className='close'
                  onClick={() => {setTweetImage(''); setFile('');}} />
                <img src={tweetImage} />
              </>
            ) : (
              <div></div>
            )}

          </div>
      </form>
  </div>
)};

export default TweetBox;