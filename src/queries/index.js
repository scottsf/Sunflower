import { gql } from 'apollo-boost'

export const GET_ME = gql`
  query {
    me {
      id
      name
      email
      password
    }
  }
`

export const GET_USERS = gql`
  query {
    users {
      id
      name
      email
    }
  }
`