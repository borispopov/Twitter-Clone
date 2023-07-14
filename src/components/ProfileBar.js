import { Avatar, Button } from '@mui/material';
import React, {forwardRef, useState, useEffect } from 'react'
import "./ProfileBar.css";
import Modal from "./Modal";


const ProfileBar = forwardRef(( ) => {

    const [openModal, setOpenModal] = useState(false);

    return (

    <div className="profile" >

        <div className="profile__avatar" onClick={() => {setOpenModal(true)}}>
            <Avatar />
        </div>

        <div className="profile__cont">
                    <div className="profile__displayName" onClick={() => {setOpenModal(true)}}>
            {sessionStorage.getItem('name')}
            </div>

            <div className="profile__username" onClick={() => {setOpenModal(true)}}>
            @{sessionStorage.getItem('username')}
            </div>
        </div>


        {openModal && <Modal
                        closeModal={setOpenModal}
                        />}


    </div>

    );
});

export default ProfileBar;