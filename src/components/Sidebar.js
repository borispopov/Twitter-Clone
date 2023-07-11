import React, {useEffect, useState} from "react";
import './Sidebar.css';
import { Button } from "@mui/material";
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import SidebarOption from "./SidebarOption";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ProfileBar from "./ProfileBar";

function Sidebar({handleLogout}){

    const [profile, setProfile] = useState([]);

    return (
    <div className="sidebar">

        <EmojiPeopleIcon className="sidebar__logoIcon" />
        <SidebarOption active Icon={HomeIcon} text="Home"/>
        <SidebarOption Icon={SearchIcon} text="Explore"/>
        <SidebarOption Icon={NotificationsNoneIcon} text="Notifications"/>
        <SidebarOption Icon={MailOutlineIcon} text="Messages"/>
        <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks"/>
        <SidebarOption Icon={ListAltIcon} text="Lists"/>
        <SidebarOption Icon={PermIdentityIcon} text="Profile"/>
        <SidebarOption Icon={MoreHorizIcon} text="More"/>

        <Button
            variant="outlined"
            className="sidebar__tweet"
            fullWidth >
            Tweet
        </Button>

        <div className="profile__bar">
            {profile.map(profile => (
            <ProfileBar
                displayName={profile.displayName}
                username={profile.username}
                verified={profile.verified}
                avatar={profile.avatar}
                />
        ))}

        </div>

        <Button className="logout__comp" onClick={() => {console.log('logging out'); handleLogout()}}>
            Logout
        </Button>

    </div>
    )
}

export default Sidebar;