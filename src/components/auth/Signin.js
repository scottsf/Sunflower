import React, { Component } from "react";
// import { withRouter } from 'react-router-dom'
import { Mutation } from "react-apollo";
import { SIGNIN } from "../../mutation/index";
import Error from '../Error'
import { Redirect } from 'react-router-dom'


const initialState = {
  email: "",
  password: ""
};

class Signin extends Component {
  state = { ...initialState };

  handleInput = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  clearState = () => {
    this.setState({ ...initialState });
  };

  handleSubmit = async (e, login) => {
    e.preventDefault();
    const response = await login();
    const { data }  = response;
    localStorage.setItem('token', data.login.token)
    console.log(this.props)
    await this.props.refetch()
    // this.clearState() // not necessary
    this.props.history.push('/')
  };

  render() {
    const { email, password } = this.setState;

    return (
      <div className="App">
        <Mutation mutation={SIGNIN} variables={{ ...this.state }}>
          {(login, { loading, error, data }) => {
            if (data && !loading) {
                return <Redirect to="/" />
            }
            return (
              <form
                className="form"
                onSubmit={e => this.handleSubmit(e, login)}
              >
                <input
                  type="text"
                  name="email"
                  value={email}
                  placeholder="email"
                  onChange={this.handleInput}
                />
                <input
                  type="password"
                  name="password"
                  value={password}
                  placeholder="password"
                  onChange={this.handleInput}
                />
                <button type="submit"> Submit </button>
                { error && <Error error={error} />}
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default Signin