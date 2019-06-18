import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { LIKE_POST } from "../../mutation/index";
import { GET_POSTS, GET_POST, GET_ME, GET_MY_POSTS } from "../../queries/index"

class LikePost extends Component {
  state = {
    like: undefined
  };

  componentDidMount() {
    const { likes } = this.props.session.me;
    const { postId } = this.props;
    const prevLike = likes.some(like => like.id === postId);

    if (prevLike) {
      this.setState({ like: prevLike });
    } else {
      this.setState({ like: prevLike });
    }
  }

  handleClick = async likePost => {
      this.setState(
        prevState => ({
          like: !prevState.like
        }),
        async () => {
          await likePost();
          await this.props.refetch()
        }
      );
  };

  render() {
    const { postId } = this.props;
    const { like } = this.state;
    console.log(this.props)

    return (
      <Mutation mutation={LIKE_POST} 
      variables={{ id: postId, like }}
      refetchQueries={() => [
        {
          query: GET_POST,
          variables: { id: postId }
        },
      ]}
      >
        {(likePost, { loading, data, error }) => {
          console.log(data);
          if (loading) return 'Loading ...'
          if (error) return `Error ${error}`

          return (
            <button onClick={() => this.handleClick(likePost)}>
              {this.state.like ? "Unlike" : "Like"}
            </button>
          );
        }}
      </Mutation>
    );
  }
}

export { LikePost as default };
