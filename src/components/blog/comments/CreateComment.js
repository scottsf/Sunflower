import React, { Component, Fragment } from "react";
import { Mutation } from "react-apollo";
import { CREATE_COMMENT } from "../../../mutation/index";
import { GET_COMMENTS } from '../../../queries/index'
import { GET_POST } from '../../../queries/index'

class CreateComment extends Component {
  state = { comment: "" };

  handleComment = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  submit = async (e, createComment) => {
    e.preventDefault()
    await createComment()
    await this.props.refetch()
  }

  render() {
    const data = {
      text: this.state.comment,
      post_id: this.props.postId
    };

    return (
      <Mutation 
        mutation={CREATE_COMMENT} 
        variables={{ data }}
        refetchQueries={() => [
          { query: GET_POST, variables: { id: data.post_id } }
        ]}
        update={(cache, { data: { createComment }}) => {
           const { comments } = cache.readQuery({
               query: GET_COMMENTS,
               variables: { post_id: data.post_id } 
           })  
           console.log("From cache: ", comments)
           console.log("Fram data: ", createComment)

           cache.writeQuery({
               query: GET_COMMENTS,
               variables: { post_id: data.post_id },
               data: {
                comments: [ ...comments, createComment ]
               }
           })
        }}
      > 
        {(createComment, { data, loading, error }) => {
          return (
            <div className="createComment row">
              <div className="seven columns">
                <input
                  name="comment"
                  type="text"
                  value={this.state.comment}
                  placeholder="Write a comment"
                  onChange={this.handleComment}
                  className="u-full-width"
                />
              </div>

              <div className="three columns">
                <button onClick={e => this.submit(e, createComment)}>
                  Send
                </button>
              </div>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export { CreateComment as default };
