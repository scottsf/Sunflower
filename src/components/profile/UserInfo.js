import React, { Fragment } from "react";

const UserInfo = ({ session }) => (
  <Fragment>
    <p>Name: {session.me.name}</p>
    <p>Email: {session.me.email}</p>
    <p>Join Date: {session.me.createdAt} </p>
  </Fragment>
);

export { UserInfo as default };
