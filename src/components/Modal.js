import React, { useState, useEffect, useRef }from 'react'
import { Avatar, Button, easing } from "@mui/material";
import "./Modal.css"
import axios from 'axios';
import EditAvatar from './EditAvatar';
import { v4 as uuid } from 'uuid'

function Modal({ closeModal }) {

    window.Buffer = window.Buffer || require("buffer").Buffer;

    const [ userError, setUserError ] = useState("");
    const [ success, setSuccess ] = useState("");
    const [ name, setName ] = useState(sessionStorage.getItem('name'));
    const [ username, setUsername ] = useState(sessionStorage.getItem('username'));
    const [ email, setEmail ] = useState(sessionStorage.getItem('email'));
    const [ avatar, setAvatar ] = useState(sessionStorage.getItem('avatar'));
    const [ avatarEdit, setAvatarEdit ] = useState(false)
    const [ file, setFile ] = useState('')
    let avatarKey = '';

    const inputRef = useRef(null);

    const handleSave = async () => {
      let res = await handleError();
      if (res) { res = await uploadFiles(); }
      if (res) { res = await updateProfile(); }
      if (res) { closeModal(false); }
    }

    const handleError = async () => {
      setUserError("");
      if (username.length < 3) {setUserError("Username Must be at Least 3 Characters"); return false;}
      else if (!email.includes('@') || !email.includes('.')) {setUserError("Invalid Email"); return false;}
      setUsername(username.toLowerCase());
      setEmail(email.toLowerCase());
      return true;
    }

    const updateProfile = async () => {
      try {
        console.log(name, username, email, sessionStorage.getItem('email'));
        const prevEmail = sessionStorage.getItem('email');
        console.log('key: ', avatarKey)
        const response = await axios.put('http://localhost:5000/profile', { name, username, email, prevEmail, avatarKey });
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('name', name);
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('avatar', avatar);
        setSuccess("Profile Information Updated")
        return true
      } catch(err) {
        setUserError(err.response.data.error)
        console.log(err)
        return false
      }

    };

    const uploadFiles = async () => {
      try {
        console.log('files: ', file);
        const key = `Avatars/${uuid()}`

        const formData = new FormData();
        formData.append('avatar', file);
        formData.append('key', key);

        const res = await axios.post('http://localhost:5000/upload', formData, { headers: {'Content-Type': 'multipart/form-data'}})
        console.log('response: ', res)
        avatarKey = res.data.uid;
        return true
      } catch (err) {
        console.log(err)
        return false
      }

    }

    const handleFile = (e) => {
      setFile(e.target.files[0]);
      setAvatarEdit(true)
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }

  return (
    <div className='modalBackground'  >
        <div className="modalContainer">
            <div className="titleCloseBtn">
                <button onClick={() => closeModal(false)}> X </button>
            </div>

            <div className="title">
                <h1>Edit Profile</h1>
            </div>

            <div className="avatar__edit" onClick={() => {
              inputRef.current.click();
              }}>
                <Avatar
                  onChange={e => setAvatar( e.target.value )}
                  src={avatar}
                  value={avatar}
                  type="image" />
                <input type="file" ref={inputRef} style={{display: 'none'}} onChange={handleFile} accept='image/'/>
            </div>

            {avatarEdit && <EditAvatar
                              setAvatarEdit={setAvatarEdit}
                              avatar={avatar}
                              setAvatar={setAvatar}/>}

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
              <Button onClick={handleSave} id="submitBtn" type="submit">Save</Button>
            </div>
        </div>
    </div>
  )
}

export default Modal