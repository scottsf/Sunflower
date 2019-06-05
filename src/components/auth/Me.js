import React from "react";
import { Query } from "react-apollo";
import { GET_ME } from "../../queries/index";

const Me = () => (
  <Query query={GET_ME} notifyOnNetworkStatusChange>
    {({ loading, error, data, refetch, networkStatus }) => {
      console.log(data);
      if (networkStatus === 4) return "Refetching!";
      if (loading || !data.users) return <p> Loading ... </p>;
      if (error) return `Error for querying data`;

      return <div key={data.me.id}>{data && <p> {data.me.name}</p>}</div>;
    }}
  </Query>
);

export { Me as default };
