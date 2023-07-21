import React, {useEffect, useState} from "react";
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

function Sidebar({handleLogout}){

    const logout = () => {
        console.log('logging out');
        handleLogout();
    }

    return (
    <div className="sidebar">

        <EmojiPeopleIcon className="sidebar__logoIcon" />
        <SidebarOption active Icon={HomeIcon} text="Home"/>
        <SidebarOption Icon={SearchIcon} text="Explore"/>
        <SidebarOption Icon={NotificationsNoneIcon} text="Notifications"/>
        <SidebarOption Icon={MailOutlineIcon} text="Messages"/>
        <SidebarOption Icon={PermIdentityIcon} text="Profile"/>

        <Button
            variant="outlined"
            className="sidebar__tweet"
            fullWidth >
            Tweet
        </Button>

        <div className="profile__bar">

            <ProfileBar className="profile__contents" />

            <Button className="logout__comp" onClick={logout}>
                Logout
            </Button>
        </div>

    </div>
    )
}

export default Sidebar;