import React, { useState, useEffect } from "react";
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { Avatar, Button } from '@mui/material';
import FlipMove from "react-flip-move";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import Post from "../components/Post";
import './Profile.css';
import { useRef } from "react";
import Modal from "../components/Modal";
import axios from "axios";

const Profile = ({ handleLogout, loggedIn }) => {
  const tweetRef = useRef(null)
  const [openModal, setOpenModal] = useState(false);
  const [ posts, setPosts ] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      const userPosts = await axios.get('http://localhost:5000/posts', {
        params: {
          sorting: parseInt(sessionStorage.getItem('uid')),
          limit: 0,
        }
      })
      console.log(userPosts)
      setPosts(userPosts.data.post)

    }
    getPosts()
  }, [])

  return (
    //BEM
    <div className="profile">
      <Sidebar
        tweetRef={tweetRef}
        handleLogout={handleLogout}
        loggedIn={loggedIn} />
      {openModal && <Modal setOpenModal={setOpenModal} />}
      <div className="profile__container">
        <div className="profile__header">
          <KeyboardBackspaceOutlinedIcon onClick={() => window.location.href = '/'} />
          <h3>{sessionStorage.getItem('name')}</h3>
        </div>
        <div className="profile__pfp">
          <Avatar sx={{ width: '150px', height: '150px'}} src={sessionStorage.getItem('avatar')}/>
          <Button className="profile__btn" onClick={() => setOpenModal(true)} >Edit Profile</Button>
        </div>
        <div className="info__container">
          <h3>{sessionStorage.getItem('name')}</h3>
          <p className="post__headerSpecial" >{'@' + sessionStorage.getItem('username')}</p>
          <p>{sessionStorage.getItem('bio')}</p>
        </div>
        <hr style={{borderTop: '1px solid rgba(222, 222, 222, 1)', borderBottom: 'none', marginTop: '10px'}} />
        <div className="user__posts">
          <FlipMove appearAnimation='accordionVertical' staggerDelayBy={20.69420} >
            {posts.map(post => (
              <Post
              key={post.pid}
              post={post}
              loggedIn={loggedIn}
              />
            ))}
          </FlipMove>
        </div>
      </div>
      <Widgets />
    </div>
  );
}

export default Profile;
