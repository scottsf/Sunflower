import gql from "graphql-tag";

export const SIGNIN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        name
      }
      token
    }
  }
`;

export const SIGNUP = gql`
  mutation($data: createUserInput!) {
    createUser(data: $data) {
      token
      user {
        id
        name
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation($data: createPostInput!) {
    createPost(data: $data) {
      id
      title
      body
      disabled
      published
    }
  }
`;

export const DELETE_POST = gql`
  mutation($id: String!) {
    deletePost(id: $id) {
      id
      title
      published
    }
  }
`;

export const LIKE_POST = gql`
  mutation($id: ID!, $like: Boolean!) {
    likePost(id: $id, like: $like) {
      id
      totalLikes
      likedBy {
        name
      }
    }
  }
`;

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      filename
      filepath
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation($data: createCommentInput!) {
    createComment(data: $data) {
      id
      text
    }
  }

` 
