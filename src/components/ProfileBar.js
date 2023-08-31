import { Avatar } from '@mui/material';
import React from 'react'
import "./ProfileBar.css";

const ProfileBar = () => {

    return (

    <div >
        <div className="profileCtn">
            <div className="profile__avatar" onClick={() => {console.log('open dropdown')}}>
                    <Avatar src={sessionStorage.getItem('avatar')}/>
                </div>

            <div className="profile__cont">
                        <div className="profile__displayName" onClick={() => {console.log('open dropdown')}}>
                {sessionStorage.getItem('name')}
                </div>

                <div className="profile__username" onClick={() => {console.log('open dropdown')}}>
                @{sessionStorage.getItem('username')}
                </div>
            </div>
        </div>
    </div>

    );
};

export default ProfileBar;