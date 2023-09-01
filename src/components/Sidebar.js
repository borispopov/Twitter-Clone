import React from "react";
import { Link } from "react-router-dom";
import './Sidebar.css';
import { Button } from "@mui/material";
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import SidebarOption from "./SidebarOption";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ProfileBar from "./ProfileBar";

function Sidebar({ tweetRef, handleLogout, loggedIn }){

    return (
    <div className="sidebar">
        <Link to='/' >
            <EmojiPeopleIcon className="sidebar__logoIcon" />
        </Link>
        <Link to='/' >
            <SidebarOption active Icon={HomeIcon} text="Home"/>
        </Link>
        <Link to='/explore' >
            <SidebarOption Icon={SearchIcon} text="Explore"/>
        </Link>
        <Link to={loggedIn ? '/notifications' : '/login'} >
            <SidebarOption Icon={NotificationsNoneIcon} text="Notifications"/>
        </Link>
        <Link to={loggedIn ? '/messages' : '/login'} >
            <SidebarOption Icon={MailOutlineIcon} text="Messages"/>
        </Link>
        <Link to={loggedIn ? '/profile' : '/login'} >
            <SidebarOption Icon={PermIdentityIcon} text="Profile"/>
        </Link>

        {loggedIn ? (
            <div className="sidebar__container">
                <Button
                    variant="outlined"
                    className="sidebar__tweet"
                    onClick={() => tweetRef.current !== null ? tweetRef.current.focus() : window.location.href = '/'}
                    fullWidth >
                    Tweet
                </Button>
                <div className="profile__bar">
                    <ProfileBar className="profile__contents" handleLogout={handleLogout} />
                </div>
            </div>
        ) : (
            <div className="profile__bar">
                <Button className="login__button" href="/login" >Login</Button>
            </div>
        )}


    </div>
    )
}

export default Sidebar;