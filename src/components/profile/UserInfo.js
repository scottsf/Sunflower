import React, { Fragment } from "react";
import Post from "../blog/Post";
import { Redirect } from 'react-router-dom'

const formatDate = date => {
  const newDate = new Date(date).toLocaleDateString("en-US");
  const newTime = new Date(date).toLocaleTimeString("en-US");
  return `${newDate} ${newTime}`;
};

const UserInfo = ({ session }) => {
    if (!session || !session.me) return <Redirect to="/" />
  return (
    <Fragment>
      <h4>User Info</h4>
      <p>Name: {session.me.name}</p>
      <p>Email: {session.me.email}</p>
      <p>Join Date: {formatDate(session.me.createdAt)} </p>
    </Fragment>
  );
};

export { UserInfo as default };
