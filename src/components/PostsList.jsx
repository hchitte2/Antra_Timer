import Post from "./Post";
import classes from "./PostsList.module.css";
// import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

function PostsList() {
  const posts = useLoaderData();
  

  function addPostHandler(postData) {
    // setPosts([postData, ...postData]); bad approach here
  
    setPosts((existingPosts) => [postData, ...existingPosts]); //follow this pattern
  }

  return ( 
    <>
      
      { posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post key={post.id} id={post.id} author={post.author} body={post.body} />
          ))}
        </ul>
      )}
      { posts.length === 0 && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2> There are no posts yet.</h2>
          <p>Start adding some!</p>
        </div>
      )}
    </>
  );
}

export default PostsList;
