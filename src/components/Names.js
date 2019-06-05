// import React from "react";
// import { Query } from "react-apollo";
// import { GET_USERS } from '../queries/index'

// const Names = () => (
//   <Query query={GET_USERS} notifyOnNetworkStatusChange>
//     {({ loading, error, data, refetch, networkStatus }) => {
//       console.log(data)
//       if (networkStatus === 4) return "Refetching!";
//       if (loading || !data.users) return <p> Loading ... </p>;
//       if (error) return `Error for querying data`;

//       return data.users.map(user => (
//         <div key={user.id}>
//           <p> {user.name}</p>
//           <button onClick={() => refetch()}>Refetch</button>
//         </div>
//       ));
//     }}
//   </Query>
// );

// export { Names as default };
