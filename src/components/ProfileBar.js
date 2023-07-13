import { Avatar, Button } from '@mui/material';
import React, {forwardRef, useState, useEffect } from 'react'
import "./ProfileBar.css";
import Modal from "./Modal";


const ProfileBar = forwardRef(({ profile }, ref) => {

    const [openModal, setOpenModal] = useState(false);
    const [ avatar, setAvatar ] = useState("");

    return (

    <div className="profile" ref={ref} >

        <div className="profile__avatar" onClick={() => {setOpenModal(true)}}>
            <Avatar />
        </div>

        <div className="profile__displayName" onClick={() => {setOpenModal(true)}}>
        {profile.name}
        </div>

        <div className="profile__username" onClick={() => {setOpenModal(true)}}>
        @{profile.username}
        </div>
        {openModal && <Modal closeModal={setOpenModal} displayName={profile.name} username={profile.username} avatar={profile.avatar}/>}


    </div>

    );
});

export default ProfileBar;