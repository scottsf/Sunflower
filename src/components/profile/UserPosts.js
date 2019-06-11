import React, { Fragment } from "react";
import { Query } from "react-apollo";
import { GET_MY_POSTS } from "../../queries/index";
import Post from "../blog/Post";

const UserPosts = ({ id, title }) => (
  <Query query={GET_MY_POSTS} variables={{ search: "" }}>
    {({ loading, data, error }) => {
      if (loading) return "Loading ...";
      console.log(data);
      return (
        <Fragment>
          {data.myPosts &&
            data.myPosts.map(post => <Post key={post.id} {...post} />)}
          {data.myPosts.length === 0 && (
            <p>
              <strong>You have not created any posts yet!</strong>
            </p>
          )}
        </Fragment>
      );
    }}
  </Query>
);

export { UserPosts as default };
