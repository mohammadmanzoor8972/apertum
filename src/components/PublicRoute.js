import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useApp } from "../hooks";

const PublicRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useApp();
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={props =>
        !isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PublicRoute;
