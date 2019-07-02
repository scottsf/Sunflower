import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import { GET_POSTS } from "../../queries/index";
import Post from "./Post";
import { SearchConsumer } from "../../context";

class Posts extends Component {
  render() {
    return (
      <SearchConsumer>
        {({ search }) => {
          return (
            <Fragment>
              <Query
                query={GET_POSTS}
                variables={{
                  query: search,
                  orderBy: "createdAt_DESC"
                }}
              >
                {({ loading, error, data }) => {
                  if (loading) return <div>Loading ...</div>;
                  return (
                    <ul className="posts">
                      {data.posts.map(post => (
                        <Post key={post.id} {...post} />
                      ))}
                    </ul>
                  );
                }}
              </Query>
            </Fragment>
          );
        }}
      </SearchConsumer>
    );
  }
}

export { Posts as default };
