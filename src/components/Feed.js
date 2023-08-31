import React, { useState, useEffect } from 'react';
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
import FlipMove from 'react-flip-move';
import axios from 'axios';

function Feed({ tweetRef, loggedIn }) {

  const [ posts, setPosts ] = useState([]);

  const handleFeed = async (limit=0, sorting='all') => {
    const res = await axios.get('http://localhost:5000/posts', {
      params: {
        sorting: sorting,
        limit: limit,
      },
    })
    setPosts(res.data.post)
  }

  useEffect(() => {
    async function handle() {
      await handleFeed();
    }
    handle()
  }, [])

  return (
    <div className="feed">
        <div className="feed__header">
          <h2>Home</h2>
        </div>

        <TweetBox
          tweetRef={tweetRef}
          setPosts={setPosts}
          handleFeed={handleFeed}
          loggedIn={loggedIn} />

        <FlipMove appearAnimation='accordionVertical' staggerDelayBy={20.69420} >
          {posts.map(post => (
            <Post
              key={post.pid}
              post={post}
              loggedIn={loggedIn}
              />
          ))}
        </FlipMove>

    </div>
  );
}

export default Feed;