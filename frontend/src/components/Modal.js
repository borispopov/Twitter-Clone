import React, { useState, useEffect }from 'react'
import { Avatar, Button } from "@material-ui/core";
import "./Modal.css"
import db from "./firebase"
// import firebase from "./firebase"
// import {doc} from "firebase/firestore"

function Modal({closeModal, username, displayName, avatar}) {

    const [usernameEdit, setUsernameEdit] = useState(username);
    const [displayNameEdit, setDisplayNameEdit] = useState(displayName);
    const [avatarEdit, setAvatarEdit] = useState();
    const [userError, setUserError] = useState("");

    // const userDoc = doc(db, "profile", doc.id);

    const handleError = () => {
      if (usernameEdit.length < 3)
      setUserError("username must be at least 3 characters");
    }

    const setProfile = () => {

        if (usernameEdit.length > 2 && displayNameEdit !== ""){
          db.collection("profile").doc("mishopopov@yahoo.com").update({
          displayName: displayNameEdit,
          username: usernameEdit,
          //   verified: true,
          //   avatar: avatar1,
          }).catch((error) =>
          console.log(error));

          setUsernameEdit("");
          setDisplayNameEdit("");
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
            {/* <div className="avatar__edit">
                <Avatar onChange={e => setAvatar(e.target.value)} 
                  value={avatar1}
                  type="image"/>
            </div> */}
            <div className="displayName__edit">
              <label >Name </label>
            <input 
              onChange={e => setDisplayNameEdit(e.target.value)} 
              value={displayNameEdit}
              placeholder="Name"
              type="text"/>
            </div>
            <div className="username__edit">
            <label >Username </label>
            <input 
              onChange={e => setUsernameEdit(e.target.value)} 
              value={usernameEdit}
              placeholder="Username"
              type="text"/>
              <p className="userError">{userError}</p>
            </div>

            <div className="footer">
                <Button onClick={() => closeModal(false)} id="cancelBtn">Cancel</Button>
                <Button onClick={() => {setProfile(); if (usernameEdit.length > 2 && displayNameEdit !== "") closeModal(false); handleError()}} type="submit">Save</Button>
            </div>
        </div>
    </div>
  )
}

export default Modal