import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { CREATE_POST } from "../../mutation/index";
import { Redirect } from "react-router-dom";
import { GET_POSTS, GET_MY_POSTS } from "../../queries/index";
import {Image, CloudinaryContext} from 'cloudinary-react';
import cloudinary from 'cloudinary-core'

const initialState = {
  title: "",
  body: "",
  image: "",
  published: true,
  disabled: false
};

class AddPost extends Component {
  state = { ...initialState };

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  uploadImage = (e) => { 
    // const file = e.target.files[0]
    // this.setState({
    //   [e.target.name]: file.name
    // })

    const reader = new FileReader()
          , file = e.target.files[0]
          , _this = this

    reader.onload = photo => {
      this.setState({
        image: photo.target.result
      })
    }

    reader.readAsDataURL(file)

    
    // const file = e.target.files[0]
    // let reader = new FileReader()
    // reader.onload = function (e) {
    //   console.log(e.target.result)
    // }
    // this.setState({
    //   [e.target.name]: file.name
    // })
    // reader.readAsDataURL(file)
  }

  handleSubmit = async (e, createPost) => {
    e.preventDefault();
    await createPost();
    await this.props.refetch();
  };

  render() {
    console.log(this.state.image)
    return (
      <Mutation
        className="form"
        mutation={CREATE_POST}
        variables={{ data: { ...this.state } }}
        refetchQueries={() => [
          {
            query: GET_MY_POSTS,
            variables: { search: "" }
          }
        ]}
        update={(cache, { data: { createPost } }) => {
          const { posts } = cache.readQuery({ query: GET_POSTS, variables: { query: "" }});
          console.log("from cache ", posts);
          console.log("from data ", createPost);
          cache.writeQuery({
            query: GET_POSTS,
            variables: { query: "" },
            data: { posts: [...posts, createPost] }
          });
        }}
      >
        {(createPost, { data, loading, error }) => {
          console.log(data);
          if (data && !loading) return <Redirect to="/" />;
          return (
            <form onSubmit={e => this.handleSubmit(e, createPost)}>
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
                type="file"
                name="image"
                // value={this.state.image}
                placeholder="image"
                accept="image/png, image/jpeg"
                onChange={this.uploadImage}
                style={{height: '200px'}}
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
              <button type="submit" className="button-primary">
                {" "}
                Submit{" "}
              </button>
            </form>
          );
        }}
      </Mutation>
    );
  }
}

export { AddPost as default };
