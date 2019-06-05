import React from "react";
import { Query } from "react-apollo";
import { GET_ME } from '../queries/index'

const withSession = Component => props => (
  <Query query={GET_ME}>
    {({ data, loading, refetch }) => {
        if (loading) return 'Loading...'
        console.log(data)
      return <Component {...props} refetch={refetch} session={data}/>;
    }}
  </Query>
);

export { withSession as default };
