import React from 'react';
import { gql, useQuery } from '@apollo/client';

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`

export const LoggedInRouter = () => {
  const { data, loading, error } = useQuery(ME_QUERY);
  if (error) {
    console.log(error);
  }
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  return <div><h1>{data?.me?.email}</h1></div>;
}
