import React, { Fragment } from "react";
import Post from "../blog/Post";

const formatDate = date => {
    const newDate = new Date(date).toLocaleDateString('en-US')
    const newTime = new Date(date).toLocaleTimeString('en-US')
    return `${newDate} at ${newTime}`

}

const UserInfo = ({ session }) => (
  <Fragment>
    <p>Name: {session.me.name}</p>
    <p>Email: {session.me.email}</p>
    <p>Join Date: {formatDate(session.me.createdAt)} </p>
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

export { UserInfo as default };
