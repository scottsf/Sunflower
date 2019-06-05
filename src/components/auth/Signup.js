import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Mutation } from "react-apollo";
import { SIGNUP } from "../../mutation/index";
import Error from "../Error";

const initialState = {
  name: "",
  password: "",
  email: "",
  passwordConfirmation: ""
};

class Signup extends Component {
  state = { ...initialState };

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async (e, createUser) => {
    e.preventDefault();
    const response = await createUser();
    const { data } = response;
    localStorage.setItem("token", data.createUser.token);
    await this.props.refetch()
    // this.clearState();
    // this.props.history.push('/')
  };

  clearState = () => {
    this.setState({ ...initialState });
  };

  validateForm = () => {
    const { name, email, password, passwordConfirmation } = this.state;
    const isValid = !name || !email || password !== passwordConfirmation;
    return isValid;
  };

  render() {
    const { name, email, password, passwordConfirmation } = this.state;
    const data = { name, email, password };

    return (
      <div className="App">
        <h2 className="App"> Signup </h2>

        <Mutation mutation={SIGNUP} variables={{ data }}>
          {(createUser, { data, loading, error }) => {
            if (data && !loading) {
              return <Redirect to="/" />;
            }
            return (
              <form
                className="form"
                onSubmit={e => this.handleSubmit(e, createUser)}
              >
                <input
                  type="text"
                  name="name"
                  value={name}
                  placeholder="Username"
                  onChange={this.handleInput}
                />
                <input
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Email"
                  onChange={this.handleInput}
                />
                <input
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={this.handleInput}
                />
                <input
                  type="password"
                  name="passwordConfirmation"
                  value={passwordConfirmation}
                  placeholder="Confirm Password"
                  onChange={this.handleInput}
                />
                <button type="submit" disabled={loading || this.validateForm()}>
                  Submit
                </button>
                {error && <Error error={error} />}
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export { Signup as default };
