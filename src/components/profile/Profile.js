import React, { Fragment } from 'react';
import UserInfo from './UserInfo'
import UserPosts from '../profile/UserPosts'

const Profile = ({ session }) => (
  <Fragment>
    <UserInfo session={session} />
    <UserPosts />
  </Fragment>
)

export { Profile as default };
