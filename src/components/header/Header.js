import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import { gql } from "apollo-boost";
import { GET_USERS } from '../../queries/index'

const CREATE_USER = gql`
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



// const USERS =
//   gql`
//     query GET_USERS {
//       users {
//         id
//         name
//         email
//       }
//     }
//   ` 

  



class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      password: "",
      email: ""
    };
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  async handleSubmit(e, createUser) {
    e.preventDefault();
    const { name, email, password } = this.state;
    await createUser({
      variables: {
        data: {
          name,
          email,
          password
        }
      },
    //   refetchQueries: [`users`]
    });

    this.setState({
      name: "",
      password: "",
      email: ""
    });
  }

  render() {
    return (
      <Mutation mutation={CREATE_USER} 
      update={(cache, { data }) => {
        const { users } = cache.readQuery({ query: GET_USERS });

        console.log(data, cache)
        cache.writeQuery({
          query: GET_USERS,
          data: { users: users.concat(data) }
        });
      }}
      >
        {(createUser, { loading, error, data }) => {
          if (loading) return <p> Loading ... </p>;


          return (
            <div className="Header">
              <form onSubmit={e => this.handleSubmit(e, createUser)}>
                <input
                  name="name"
                  value={this.state.name}
                  onChange={e => this.handleInput(e)}
                />
                <input
                  name="password"
                  value={this.state.password}
                  onChange={e => this.handleInput(e)}
                />
                <input
                  name="email"
                  password={this.state.email}
                  onChange={e => this.handleInput(e)}
                />
                <input type="submit" value="Submit" />
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export { Header as default };
