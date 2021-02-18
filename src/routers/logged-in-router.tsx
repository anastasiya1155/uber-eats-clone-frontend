import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Restaurants } from '../pages/client/restaurants';
import { NotFound } from '../pages/404';
import { Header } from '../components/header';
import { useMe } from "../hooks/useMe";
import { ConfirmEmail } from '../pages/user/confirm-email';
import { EditProfile } from '../pages/user/edit-profile';

const ClientRoutes = [
  <Route path="/confirm" key='confirm'>
    <ConfirmEmail />
  </Route>,
  <Route path="/edit-profile" key='edit-profile'>
    <EditProfile />
  </Route>,
  <Route path="/" exact key='base'>
    <Restaurants />
  </Route>,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
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
      <Header />
      <Switch>
        {data.me.role === "Client" && ClientRoutes}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}
