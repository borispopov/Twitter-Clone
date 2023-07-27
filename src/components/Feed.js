import React, { useState, useEffect } from 'react';
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
import FlipMove from 'react-flip-move';
import axios from 'axios';

function Feed() {
  const [ posts, setPosts ] = useState([]);

  const handleFeed = async () => {
    const res = await axios.get('http://localhost:5000/posts')
    console.log(res.data.post)
    setPosts(res.data.post)
  }

  useEffect(() => {
    handleFeed()
  }, [])

  return (
    <div className="feed">
        <div className="feed__header">
        <h2>Home</h2>
        </div>

        <TweetBox />

        <FlipMove>
          {posts.map(post => (
            <Post
                displayName={post.name}
                username={post.username}
                image={post.image}
                description={post.description}
                avatar={post.avatar}
                timestamp={post.timestamp}
                />
          ))}

        </FlipMove>

    </div>
  );
}

export default Feed;