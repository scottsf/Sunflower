import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { CREATE_POST } from "../../mutation/index";
import { Redirect } from 'react-router-dom'
import { GET_POSTS } from '../../queries/index'

const initialState = {
  title: "",
  body: "",
  published: true,
  disabled: false
};

class AddPost extends Component {
  state = { ...initialState };

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e, createPost) => {
    e.preventDefault();
    await createPost();
    await this.props.refetch()
  };

  render() {
    return (
      <Mutation className="form" mutation={CREATE_POST} variables={{ data: { ...this.state }}}    
      update={(cache, { data: { createPost } }) => {
        const { posts } = cache.readQuery({ query: GET_POSTS });
        console.log('from cache ', posts)
        console.log('from data ', createPost)
        cache.writeQuery({
          query: GET_POSTS,
          data: { posts: [posts, ...createPost] }
        });
      }}>
        {(createPost, { data, loading, error }) => {
          console.log(data)
           if (data && !loading) return <Redirect to="/" /> 
          return (
            <form onSubmit={(e) => this.handleSubmit(e, createPost)}>
              <input
                type="text"
                name="title"
                value={this.state.title}
                placeholder="title"
                onChange={this.handleInput}
              />
              <input
                type="text"
                name="body"
                value={this.state.body}
                placeholder="body"
                onChange={this.handleInput}
              />
              <input
                type="checkbox"
                name="published"
                checked={this.state.published}
                placeholder="published"
                onChange={() =>
                  this.setState(prevState => ({
                    published: !prevState.published
                  }))
                }
              />
              <input
                type="checkbox"
                name="disabled"
                checked={this.state.disabled}
                placeholder="disabled"
                onChange={() =>
                  this.setState(prevState => ({
                    disabled: !prevState.disabled
                  }))
                }
              />
              <button type="submit" className="button-primary"> Submit </button>
            </form>
          );
        }}
      </Mutation>
    );
  }
}

export { AddPost as default };
