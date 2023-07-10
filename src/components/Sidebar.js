import React, {useEffect, useState} from "react";
import './Sidebar.css';
// import { Button } from "@material-ui/core";
// import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
// import SidebarOption from "./SidebarOption";
// import HomeIcon from '@material-ui/icons/Home';
// import SearchIcon from '@material-ui/icons/Search';
// import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
// import MailOutlineIcon from '@material-ui/icons/MailOutline';
// import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
// import ListAltIcon from '@material-ui/icons/ListAlt';
// import PermIdentityIcon from '@material-ui/icons/PermIdentity';
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import db from "./firebase";
import ProfileBar from "./ProfileBar";

function Sidebar( {handleLogout} ){

    const [profile, setProfile] = useState([]);

        useEffect(() => {
          db.collection("profile").onSnapshot(snapshot => (
            setProfile(snapshot.docs.map(doc => doc.data()))
          ))
        }, []);

    return (

    <div className="sidebar">

        {/* <EmojiPeopleIcon className="sidebar__logoIcon" />

        <SidebarOption active Icon={HomeIcon} text="Home"/>
        <SidebarOption Icon={SearchIcon} text="Explore"/>
        <SidebarOption Icon={NotificationsNoneIcon} text="Notifications"/>
        <SidebarOption Icon={MailOutlineIcon} text="Messages"/>
        <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks"/>
        <SidebarOption Icon={ListAltIcon} text="Lists"/>
        <SidebarOption Icon={PermIdentityIcon} text="Profile"/>
        <SidebarOption Icon={MoreHorizIcon} text="More"/> */}

        {/* <Button
            variant="outlined"
            className="sidebar__tweet"
            fullWidth >
            Tweet
        </Button> */}

        {/* <div className="profile__bar">
            {profile.map(profile => (
            <ProfileBar
                displayName={profile.displayName}
                username={profile.username}
                verified={profile.verified}
                avatar={profile.avatar}
                />
        ))}

        </div> */}

        {/* <Button className="logout__comp" onClick={handleLogout}>
            Logout
        </Button> */}

    </div>
    )
}

export default Sidebar;