import React from "react";
import { Query } from "react-apollo";
import { GET_POST } from "../../../queries";

const Comments = ({ postId }) => (
  <Query query={ GET_POST } variables={{ id: postId }}>
    {({ data, loading, error }) => {
      if (loading) return "Loading";
      return (
        <ul>
          {data.post.comments.map(comment => (
              <li key={comment.id}>{comment.text}</li>
          ))}
        </ul>
      );
    }}
  </Query>
);

export { Comments as default };
