import React, { Fragment } from 'react';
import UserInfo from './UserInfo'

const Profile = ({ session }) => (
  <Fragment>
    <UserInfo session={session} />
  </Fragment>
)

export { Profile as default };
