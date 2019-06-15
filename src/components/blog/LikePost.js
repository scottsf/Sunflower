import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { LIKE_POST } from "../../mutation/index";

class LikePost extends Component {
  state = {
    liked: undefined
  };

  componentDidMount() {
    const { likes } = this.props.session.me;
    const { postId } = this.props;
    const prevLike = likes.some(like => like.id === postId);

    if (prevLike) {
      this.setState({ liked: prevLike });
    } else {
      this.setState({ liked: prevLike });
    }
  }

  handleClick = async likePost => {
      this.setState(
        prevState => ({
          liked: !prevState.liked
        }),
        async () => {
          await likePost();
        }
      );
    await this.props.prefetch()
  };

  render() {
    const { postId } = this.props;
    const { liked } = this.state;

    return (
      <Mutation mutation={LIKE_POST} variables={{ id: postId, like: liked }}>
        {(likePost, { loading, data, error }) => {
          console.log(data);
          if (loading) return 'Loading ...'
          if (error) return `Error ${error}`
          
          return (
            <button onClick={() => this.handleClick(likePost)}>
              {this.state.liked ? "Liked" : "Like"}
            </button>
          );
        }}
      </Mutation>
    );
  }
}

export { LikePost as default };
