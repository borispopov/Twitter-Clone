import React, { useState, useEffect }from 'react'
import { Avatar, Button, easing } from "@mui/material";
import "./Modal.css"
import axios from 'axios';

function Modal({ closeModal }) {

    const [ userError, setUserError ] = useState("");
    const [ success, setSuccess ] = useState("");
    const [ name, setName ] = useState(sessionStorage.getItem('name'));
    const [ username, setUsername ] = useState(sessionStorage.getItem('username'));
    const [ email, setEmail ] = useState(sessionStorage.getItem('email'));
    const [ avatar, setAvatar ] = useState("");

    const handleError = async () => {
      setUserError("");
      if (username.length < 3) {setUserError("Username Must be at Least 3 Characters"); return false;}
      else if (!email.includes('@') || !email.includes('.')) {setUserError("Invalid Email"); return false;}
      setUsername(username.toLowerCase());
      setEmail(email.toLowerCase());
      return await updateProfile();
    }

    const updateProfile = async () => {
      try {
        console.log(name, username, email, sessionStorage.getItem('email'));
        const prevEmail = sessionStorage.getItem('email');
        const response = await axios.put('http://localhost:5000/profile', { name, username, email, prevEmail });
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('name', name);
        sessionStorage.setItem('username', username);
        setSuccess("Profile Information Updated")
        return true
      } catch(err) {
        setUserError(err.response.data.error)
        console.log(err)
        return false
      }

    };

  return (
    <div className='modalBackground'  >
        <div className="modalContainer">
            <div className="titleCloseBtn">
                <button onClick={() => closeModal(false)}> X </button>
            </div>
            <div className="title">
                <h1>Edit Profile</h1>
            </div>
            <div className="avatar__edit">
                <Avatar onChange={e => setAvatar( e.target.value )}
                  value={avatar}
                  type="image"/>
            </div>
            <div className="displayName__edit">
              <label >Name </label>
              <input
                onChange={e => setName( e.target.value )}
                value={name}
                placeholder="name"
                type="text"/>
            </div>
            <div className="username__edit">
              <label >Username </label>
              <input
                onChange={e => setUsername( e.target.value )}
                value={username}
                placeholder="username"
                type="text"/>
            </div>
            <div className="email__edit">
              <label >Email </label>
              <input
                onChange={e => setEmail( e.target.value )}
                value={email}
                placeholder="name@website.com"
                type="text"/>
            </div>
            <p className="user__error">{userError}</p>
            <p className="success">{success}</p>
            <div className="footer">
              <Button onClick={() => closeModal(false)} id="cancelBtn">Cancel</Button>
              <Button onClick={ async () => {
                const res = await handleError();
                setTimeout(async () => {
                  if (res) closeModal(false);
                }, 1000)
              }} id="submitBtn" type="submit">Save</Button>
            </div>
        </div>
    </div>
  )
}

export default Modal