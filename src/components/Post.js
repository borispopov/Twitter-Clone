import React, { forwardRef } from 'react'
import "./Post.css";
import { Avatar } from '@mui/material';
import { useState } from 'react';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import axios from 'axios';

const Post = forwardRef(({ post, loggedIn }, ref) => {

    const pid = post.pid
    const displayName = post.name
    const username = post.username
    const image = post.image
    const description = post.description
    const avatar = post.avatar
    const timestamp = post.timestamp
    const [ likes, setLikes ] = useState(post.likes)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const formatDate = (timestamp) => {
        const timeDiff = parseInt((Date.now() - timestamp)/1000)
        const date = new Date(parseInt(timestamp))
        switch(true) {
            case timeDiff < 60: // seconds
                return parseInt(timeDiff)+'s'
            case timeDiff >= 60 && timeDiff < 3600: // minutes
                return parseInt(timeDiff/60)+'m'
            case timeDiff >= 3600 && timeDiff < 86400: // hours
                return parseInt(timeDiff/3600)+'h'
            case timeDiff >= 86400 && timeDiff < 31536000: // days
                return months[date.getMonth()] + ' ' + date.getDate()
            case timeDiff >= 31536000: // More Than One Year
                return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
        }
    };

    const updateLikes = async () => {
        try {
            if (loggedIn) {
                const l = await axios.post('http://localhost:5000/like',
                    { pid: pid },
                    {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    }
                );
                setLikes(l.data.likes)
            } else {
                window.location.href = '/login'
            }

        } catch (err) {
            console.log(err)
        }
    }

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
                                @{username}
                            </span>
                            <span className="post__time">
                                {' · ' + formatDate(timestamp)}
                            </span>
                        </h3>
                    </div>
                    <div className="post__headerDescription">
                        <p>{description}</p>
                    </div>
                </div>
                {image.length > 0 ? (
                    <img src={image} />
                ) : (
                    <div></div>
                )}

                <div className="post__footer">
                    <div className="comments">
                        <ChatBubbleOutlineIcon fontSize="small" className='actions' />
                    </div>
                    <div className="retweets">
                        <RepeatOutlinedIcon fontSize="small" className='actions' />
                    </div>
                    <div className="likes" onClick={updateLikes} >
                        <FavoriteBorderOutlinedIcon fontSize="small" className='actions' />
                        <p>{likes}</p>
                    </div>
                    <div className="bookmarks">
                        <BookmarkBorderOutlinedIcon fontSize="small" className='actions' />
                    </div>
                </div>
            </div>
        </div>
  );
});

export default Post;