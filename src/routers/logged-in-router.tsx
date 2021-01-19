import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Restaurants } from '../pages/client/restaurants';
import { NotFound } from '../pages/404';

const ClientRoutes = [
  <Route path="/" exact>
    <Restaurants />
  </Route>,
];

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
  if (!data || loading || error) {
    return (

      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <Router>
      <Switch>
        {data.me.role === "Client" && ClientRoutes}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}
