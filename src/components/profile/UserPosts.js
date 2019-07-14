import React, { Fragment } from "react";
import { Query, Mutation } from "react-apollo";
import { GET_MY_POSTS, GET_POSTS, GET_ME } from "../../queries/index";
import { DELETE_POST } from "../../mutation/index";
import Post from "../blog/Post";

const handleClick = async deletePost => {
  const confirm = window.confirm("Are you sure to delete this post?");
  if (confirm) {
    await deletePost();
  }
};

const UserPosts = () => (
  <Query query={GET_MY_POSTS} variables={{ search: "" }}>
    {({ loading, data, error }) => {
      if (loading) return "Loading ...";
      if (error) return `Error ${Error}`;
      console.log('DATA :', data)
      return (
        <ul className="myPosts">
          <h4>My posts</h4>
          {data.myPosts &&
            data.myPosts.map(post => (
              <Fragment key={post.id}>
                <Post key={post.id} {...post} />
                <p className={{ marginBottom: "0" }}>likes: { post.totalLikes }</p>
                <Mutation
                  mutation={DELETE_POST}
                  variables={{ id: post.id }}
                  refetchQueries={() => [
                    { query: GET_POSTS, variables: { query: "" } },
                    { query: GET_ME }
                  ]}
                  update={(cache, { data: { deletePost } }) => {
                    const { myPosts } = cache.readQuery({
                      query: GET_MY_POSTS,
                      variables: { search: "" }
                    });

                    console.log("From cache: ", myPosts);
                    console.log("From data: ", deletePost);

                    cache.writeQuery({
                      query: GET_MY_POSTS,
                      variables: { search: "" },
                      data: {
                        myPosts: myPosts.filter(
                          myPost => myPost.id !== deletePost.id
                        )
                      }
                    });
                  }}
                >
                  {(deletePost, attrs = {}) => (
                    <button
                      className="delete-button"
                      onClick={() => handleClick(deletePost)}
                    >
                      {attrs.loading ? "deleting..." : "X"}
                    </button>
                  )}
                </Mutation>
              </Fragment>
            ))}
          {data.myPosts.length === 0 && (
            <p>
              <strong>You have not created any posts yet!</strong>
            </p>
          )}
        </ul>
      );
    }}
  </Query>
);

export { UserPosts as default };
