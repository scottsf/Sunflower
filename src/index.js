import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider } from "react-apollo";
import ApolloBoost from "apollo-boost";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import Navbar from "./components/Navbar";
import Search from './components/blog/Search'
import AddPost from './components/blog/AddPost'
import Profile from './components/blog/Profile'
import withSession from "./components/withSession";
import Me from "./components/auth/Me";

const client = new ApolloBoost({
  uri: "http://localhost:4001/graphql",
  fetchOptions: {
    credentials: "include" // allow us to send our token to back-end
  },
  request: operation => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log("Network Error", networkError);
    }

    // if (networkError.statusCode === 401) {
    //   localStorage.removeItem('token')
    // }
  }
});

// console.log(client.fetchOptions)
// console.log(client.request)

const Root = ({ refetch, session}) => (
  <BrowserRouter>
    <Fragment>
      <Navbar session={session}/>
      <Switch>
        <Route path="/" component={App} exact />
        <Route path="/search" component={Search}  />
        <Route
          path="/signin"
          render={props => <Signin refetch={refetch} {...props} />}
        />
        <Route
          path="/signup"
          render={props => <Signup refetch={refetch} {...props} />}
        />
        <Route path="/post/add" component={AddPost} />
        <Route path="/profile" component={Profile} />
        
        <Route path="/me" component={Me} />
        <Redirect to="/" />
      </Switch>
    </Fragment>
  </BrowserRouter>
);

const RootWithSession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <RootWithSession />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
