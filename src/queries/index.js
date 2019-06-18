import { gql } from "apollo-boost";

export const GET_ME = gql`
  query {
    me {
      id
      name
      email
      password
      createdAt
      likes {
        id
        title
        body
        published
        disabled
        # likedBy {
        #   id
        # }
        totalLikes
      }
    }
  }
`;

export const GET_USERS = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

export const GET_POSTS = gql`
  query($query: String!) {
    posts(query: $query) {
      id
      title
      body
      published
      disabled
      # likedBy {
      #   id
      # }
      totalLikes
    }
  }
`;

export const GET_POST = gql`
  query($id: ID!) {
    post(id: $id) {
      id
      title
      body
      disabled
      # likedBy {
      #   id
      # }
      totalLikes
    }
  }
`;

export const GET_MY_POSTS = gql`
  query($search: String!) {
    myPosts(query: $search) {
      id
      title
      body
      # likedBy {
      #   id
      # }
      totalLikes
    }
  }
`;
