import React, { forwardRef } from 'react'
import "./Post.css";
import { Avatar, Button } from '@mui/material';
import { useState } from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';

const Post = forwardRef(({ displayName, username, image, description, avatar, timestamp}, ref) => {

    const [ verified, setVerified ] = useState()
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const formatDate = (timestamp) => {
        const timeDiff = parseInt(Date.now()/1000 - timestamp)
        const date = new Date(timestamp*1000)
        console.log(timeDiff)
        switch(true) {
            case timeDiff < 3600: // One Hour
                return parseInt(timeDiff/60)+'m'
            case timeDiff >= 3600 && timeDiff < 86400: // One Day
                return parseInt(timeDiff/3600)+' h'
            case timeDiff >= 86400 && timeDiff < 31536000: // One Year
                return months[date.getMonth()] + ' ' + date.getDate()
            case timeDiff >= 31536000: // More Than One Year
                return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
        }
      };

    // console.log(displayName, username, image, description, avatar, timestamp)

    return (

    <div className="post" ref={ref}>
        <div className="post__avatar">
            <Avatar src={avatar} />
        </div>
        <div className="post__body">
            <div className="post__header">
                <div className="post__headerText">
                    <h3>
                        {displayName}{" "}
                        <span className="post__headerSpecial">
                            @{username} {formatDate(timestamp)} {verified && <VerifiedIcon className="post__badge" />}
                        </span>
                    </h3>
                </div>
                <div className="post__headerDescription">
                    <p>{description}</p>
                </div>
            </div>
            <img src={image} alt=""/>
            <div className="post__footer">
                <ChatBubbleOutlineIcon fontSize="small" />
                <RepeatOutlinedIcon fontSize="small" />
                <FavoriteBorderOutlinedIcon fontSize="small" />
                <BookmarkBorderOutlinedIcon fontSize="small" />
            </div>
        </div>
        </div>
  );
});

export default Post;