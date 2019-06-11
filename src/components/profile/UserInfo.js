import React, { Fragment } from "react";
import Post from '../blog/Post'

const UserInfo = ({ session }) => (
  <Fragment>
    <p>Name: {session.me.name}</p>
    <p>Email: {session.me.email}</p>
    <p>Join Date: {session.me.createdAt} </p>
    {
        session.me.likes.map(post => (
            <Post key={post.id} {...post}/>
        ))
    }

  </Fragment>
);

export { UserInfo as default };
