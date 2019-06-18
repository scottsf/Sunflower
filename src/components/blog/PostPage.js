import React, { Fragment } from "react";
import { Query } from "react-apollo";
import { GET_POST } from "../../queries/index";
import LikePost from "./LikePost";

const PostPage = props => {
  const { id } = props.match.params;
  return (
    <Query query={GET_POST} variables={{ id }}>
      {({ loading, error, data }) => {
        const { post } = data;
        console.log(post)
        if (loading) return "Loading ...";
        if (error) return `Error ${error}`

        return (
          <Fragment>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p>Total likes: {post.totalLikes}</p>
            <LikePost postId={post.id} {...props} />
          </Fragment>
        );
      }}
    </Query>
  );
};

export { PostPage as default };
