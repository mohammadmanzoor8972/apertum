import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AppProvider } from "./providers";
import { PrivateRoute, Header, PublicRoute, Loader } from "./components";
import {  Login,Users } from "./pages";


function App() {
  return (
    <AppProvider>
        <Header/>
        <Loader />
        <BrowserRouter>
          <Switch>
            {<PrivateRoute component={Users} path="/" exact />}
            <PublicRoute component={Login} path="/login" exact />
            {/* <Route component={NotFound} /> */}
          </Switch>
      </BrowserRouter>
   </AppProvider>
  );
}

export default App;
