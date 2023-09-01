import { Avatar } from '@mui/material';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import React, { useRef, useState, useEffect } from 'react'
import "./ProfileBar.css";

const ProfileBar = ({ handleLogout }) => {
    const profileRef = useRef(null)
    const [ profileModal, setProfileModal ] = useState(false)

    useEffect(() => {
        function handleClickOutside(event) {
          if (!profileRef.current.contains(event.target)) {
            setProfileModal(false);
          }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }, []);

    return (
    <div className="profile__background" onClick={() => setProfileModal(!profileModal)} ref={profileRef} >
        <div className="profileCtn">
            <div className="profile__avatar" >
                <Avatar src={sessionStorage.getItem('avatar')}/>
            </div>

            <div className="profile__cont">
                        <div className="profile__displayName" >
                {sessionStorage.getItem('name')}
                </div>

                <div className="profile__username" >
                @{sessionStorage.getItem('username')}
                </div>
            </div>
            <MoreHorizOutlinedIcon />
        </div>
        {profileModal && (
            <div className="logging__out" onClick={() => {
                handleLogout();
                setProfileModal(false)
            }} >
                <button>Logout</button>
            </div>
        )}

    </div>

    );
};

export default ProfileBar;