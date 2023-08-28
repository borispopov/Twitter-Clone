import React, { useState, useEffect } from 'react';
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
import FlipMove from 'react-flip-move';
import axios from 'axios';

function Feed({ tweetRef }) {

  const [ posts, setPosts ] = useState([]);

  const handleFeed = async (num=0, query='all') => {
    const res = await axios.get('http://localhost:5000/posts', {
      params: {
        query: query,
        num: num
      }
    })
    setPosts(res.data.post)
  }

  useEffect(() => {
    async function handle() {
      await handleFeed()
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
          handleFeed={handleFeed} />

        <FlipMove>
          {posts.map(post => (
            <Post
              key={post.pid}
              post={post}
              />
          ))}
        </FlipMove>

    </div>
  );
}

export default Feed;