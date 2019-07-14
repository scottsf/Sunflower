import React, { Fragment } from "react";
import { Query } from "react-apollo";
import { GET_COMMENTS } from "../../../queries";
import Comment from "./Comment";
import CreateComment from "./CreateComment";

const Comments = ({ postId, refetch }) => (
  <Fragment>
    
  <Query 
    query={GET_COMMENTS} 
    variables={{ post_id: postId }}
  >
    {({ data, loading, error }) => {
      if (loading) return "Loading";
      console.log(data)
      return (
        <Fragment>
          <ul className="comments">
            {data.comments.map(comment => (
              <Comment key={comment.id} {...comment} />
            ))}
          </ul>
          <CreateComment postId={postId} refetch={refetch}/>
        </Fragment>
      );
    }}
  </Query>
  </Fragment>
);

export { Comments as default };
