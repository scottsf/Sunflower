import React, { Fragment } from "react";
import Post from "../blog/Post";
import { Redirect } from 'react-router-dom'

const formatDate = date => {
  const newDate = new Date(date).toLocaleDateString("en-US");
  const newTime = new Date(date).toLocaleTimeString("en-US");
  return `${newDate} at ${newTime}`;
};

const UserInfo = ({ session }) => {
    if (!session || !session.me) return <Redirect to="/" />
  return (
    <Fragment>
      <h4>User Info</h4>
      <p>Name: {session.me.name}</p>
      <p>Email: {session.me.email}</p>
      <p>Join Date: {formatDate(session.me.createdAt)} </p>
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

export { UserInfo as default };
