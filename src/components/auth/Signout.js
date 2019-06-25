import React from "react";
import { ApolloConsumer } from "react-apollo";
import { Redirect } from "react-router-dom";

const handleClick = client => {
  localStorage.setItem('token', '');
  client.resetStore();
  return <Redirect to="/"/>
};

const Signout = () => (
  <ApolloConsumer>
    {client => {
      return <button className="signout button-primary" onClick={() => handleClick(client)}> Signout </button>;
    }}
  </ApolloConsumer>
);

export { Signout as default };
