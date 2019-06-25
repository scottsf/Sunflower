import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider } from "react-apollo";
// import ApolloBoost from "apollo-boost";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { createUploadLink } from "apollo-upload-client";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import Navbar from "./components/Navbar";
import Search from "./components/blog/Search";
import AddPost from "./components/blog/AddPost";
import PostPage from "./components/blog/PostPage";
import Profile from "./components/profile/Profile";
import withSession from "./components/withSession";
import Me from "./components/auth/Me";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { withClientState } from "apollo-link-state";
import { ApolloLink, Observable } from "apollo-link";

// Migrated APOLLO-BOOST to APOLLO-CLIENT manually
const cache = new InMemoryCache();

const request = async operation => {
  const token = await localStorage.getItem("token");
  operation.setContext({
    headers: {
      authorization: token
    }
  });
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle;
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    // onError(({ graphQLErrors, networkError }) => {
    //   if (graphQLErrors) {
    //     sendToLoggingService(graphQLErrors);
    //   }
    //   if (networkError) {
    //     logoutUser();
    //   }
    // }),
    requestLink,
    withClientState({
      defaults: {
        isConnected: true
      },
      resolvers: {
        Mutation: {
          updateNetworkStatus: (_, { isConnected }, { cache }) => {
            cache.writeData({ data: { isConnected }});
            return null;
          }
        }
      },
      cache
    }),
    new HttpLink({
      uri: "http://localhost:4001/graphql",
      credentials: "same-origin"
    })
  ]),
  cache
});

// const client = new ApolloBoost({
//   uri: "http://localhost:4001/graphql",
//   link: createUploadLink(),
//   fetchOptions: {
//     credentials: "include" // allow us to send our token to back-end
//   },
//   request: operation => {
//     const token = localStorage.getItem("token");
//     operation.setContext({
//       headers: {
//         authorization: token
//       }
//     });
//   },
//   onError: ({ networkError }) => {
//     if (networkError) {
//       console.log("Network Error", networkError);
//     }

//     // if (networkError.statusCode === 401) {
//     //   localStorage.removeItem('token')
//     // }
//   }
// });

// console.log(client.fetchOptions)
// console.log(client.request)

const Root = ({ refetch, session }) => (
  <BrowserRouter>
    <div className="Page">
      <Navbar session={session} />
      <Switch>
        <Route path="/" component={App} exact />
        <Route path="/search" component={Search} />
        <Route
          path="/signin"
          render={props => <Signin refetch={refetch} {...props} />}
        />
        <Route
          path="/signup"
          render={props => <Signup refetch={refetch} {...props} />}
        />
        <Route
          path="/post/add"
          render={props => (
            <AddPost refetch={refetch} session={session} {...props} />
          )}
        />
        <Route
          path="/post/:id"
          render={props => (
            <PostPage refetch={refetch} session={session} {...props} />
          )}
        />

        <Route
          path="/profile"
          render={props => <Profile session={session} />}
        />

        <Route path="/me" component={Me} />
        <Redirect to="/" />
      </Switch>
    </div>
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
