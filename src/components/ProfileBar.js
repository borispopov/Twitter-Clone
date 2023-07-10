// import { Avatar, Button } from '@material-ui/core';
import React, {forwardRef, useState, useEffect } from 'react'
import "./ProfileBar.css";
import Modal from "./Modal";


const ProfileBar = forwardRef(({ displayName, username, verified, avatar}, ref) => {

    const [openModal, setOpenModal] = useState(false);

    return (

    <div className="profile" ref={ref} >

        <div className="profile__avatar" onClick={() => {setOpenModal(true)}}>
            {/* <Avatar /> */}
        </div>

        <div className="profile__displayName" onClick={() => {setOpenModal(true)}}>
        {displayName}
        </div>

        <div className="profile__username" onClick={() => {setOpenModal(true)}}>
        @{username}
        </div>
        {openModal && <Modal closeModal={setOpenModal} displayName={displayName} username={username} avatar={avatar} />}


    </div>

    );
});

export default ProfileBar;