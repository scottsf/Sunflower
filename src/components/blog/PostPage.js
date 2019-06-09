import React, { Fragment } from "react";
import { Query } from "react-apollo";
import { GET_POST } from "../../queries/index";

const PostPage = ({ match }) => {
  const { id } = match.params;
  return (
    <Query query={GET_POST} variables={{ id }}>
      {({loading, error, data}) => {
        const { post } = data
        if (loading) return "Loading ...";
        return (
            <Fragment>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
            </Fragment>
        )
      }}
    </Query>
  );
};

export { PostPage as default };
