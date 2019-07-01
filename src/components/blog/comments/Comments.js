import React, { Fragment } from "react";
import { Query } from "react-apollo";
import { GET_COMMENTS } from "../../../queries";
import Comment from "./Comment";
import CreateComment from "./CreateComment";

const Comments = ({ postId, refetch }) => (
  <Query query={GET_COMMENTS} variables={{ post_id: postId }}>
    {({ data, loading, error }) => {
      if (loading) return "Loading";
      return (
        <Fragment>
          <CreateComment postId={postId} refetch={refetch}/>
          <ul>
            {data.comments.map(comment => (
              <Comment key={comment.id} {...comment} />
            ))}
          </ul>
        </Fragment>
      );
    }}
  </Query>
);

export { Comments as default };
