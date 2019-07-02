import React, { Fragment } from "react";
import Post from "../blog/Post";
import { Redirect } from 'react-router-dom'

const Favorite = ({ session }) => {
    if (!session || !session.me) return <Redirect to="/" />
  return (
    <Fragment>
      <h4>Favorite posts</h4>
      {session.me.likes.map(post => (
        <Post key={post.id} {...post} />
      ))}
      {session.me.likes.length === 0 && (
        <p>
          <strong>You have no favorite posts yet!</strong>
        </p>
      )}
    </Fragment>
  );
};

export { Favorite as default };
