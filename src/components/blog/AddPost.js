import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { CREATE_POST } from "../../mutation/index";
import { Redirect } from "react-router-dom";
import { GET_POSTS, GET_MY_POSTS } from "../../queries/index";
import { UPLOAD_FILE } from "../../mutation/index";

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

  uploadImage = async (file, uploadFile) => {
    const res = await uploadFile({ variables: { file } });
    const image = res.data.uploadFile.filepath;
    this.setState({ image });
  };

  handleSubmit = async (e, createPost) => {
    e.preventDefault();
    if (this.state.image) {
      await createPost();
      await this.props.refetch();
    }
  };

  render() {
    return (
      <Mutation
        mutation={CREATE_POST}
        variables={{ data: { ...this.state } }}
        // refetchQueries={() => [
        //   {
        //     query: GET_MY_POSTS,
        //     variables: { search: "" }
        //   }
        // ]}
        update={(cache, { data: { createPost } }) => {
          const { posts } = cache.readQuery({
            query: GET_POSTS,
            variables: { query: "" }
          });

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
            <form
              className="form"
              onSubmit={e => this.handleSubmit(e, createPost)}
            >
              <Mutation mutation={UPLOAD_FILE}>
                {(uploadFile, { loading, error, data }) => {
                  return (
                    <input
                      type="file"
                      required
                      placeholder="image"
                      accept="image/png, image/jpeg"
                      // style={{ height: "200px" }}
                      onChange={({
                        target: {
                          validity,
                          files: [file]
                        }
                      }) =>
                        validity.valid && this.uploadImage(file, uploadFile)
                      }
                    />
                  );
                }}
              </Mutation>
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
              <div>
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
                <label htmlFor="file">Publish your post</label>
              </div>
              <div>
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
                <label>Disable comments</label>
              </div>
              <button type="submit" className="button-primary">
                Submit
              </button>
            </form>
          );
        }}
      </Mutation>
    );
  }
}

export { AddPost as default };
