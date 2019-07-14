import React from "react";
import { Query } from "react-apollo";
import { GET_POST } from "../../queries/index";
import LikePost from "./LikePost";
import Comments from "./comments/Comments";

const PostPage = props => {
  const { id } = props.match.params;

  return (
    <Query query={GET_POST} variables={{ id }}>
      {({ loading, error, data }) => {
        const { post } = data;
        if (loading) return "Loading ...";
        if (error) return `Error ${error}`;

        return (
          <article className="postPage ">
            <img className="postPage_image" src={post.image} alt={post.title} />
            <aside>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <p>Likes: {post.totalLikes}</p>
              <LikePost postId={post.id} {...props} />
              <Comments postId={post.id} refetch={props.refetch} />
            </aside>
          </article>
        );
      }}
    </Query>
  );
};

export { PostPage as default };
