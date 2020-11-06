import React, { useEffect, useState } from 'react';
import Login from './components/Login/LoginContainer';
import Join from './components/join/Join';
import { Route, Switch } from 'react-router-dom';
import Router from './routes/routes';
import LayoutContainer from './components/layout/LayoutContainer';
require('dotenv').config();

const App = () => {
  useEffect(() => {
    console.log('가자 삥삥!');
  });
  return (
    <Switch>
      <Route path="/" component={Login} exact={true} />
      <Route path="/join" component={Join} />
      <LayoutContainer>
        <Router />
      </LayoutContainer>
    </Switch>
  );
};

export default App;
