import { Avatar } from '@mui/material';
import React, {useState } from 'react'
import "./ProfileBar.css";
import Modal from "./Modal";


const ProfileBar = () => {

    const [openModal, setOpenModal] = useState(false);

    return (

    <div className="profile" >
        <div className="profileCtn">
            <div className="profile__avatar" onClick={() => {setOpenModal(true)}}>
                    <Avatar src={sessionStorage.getItem('avatar')}/>
                </div>

            <div className="profile__cont">
                        <div className="profile__displayName" onClick={() => {setOpenModal(true)}}>
                {sessionStorage.getItem('name')}
                </div>

                <div className="profile__username" onClick={() => {setOpenModal(true)}}>
                @{sessionStorage.getItem('username')}
                </div>
            </div>
        </div>

        {openModal && <Modal
                        closeModal={setOpenModal}
                        />}


    </div>

    );
};

export default ProfileBar;