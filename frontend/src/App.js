import React, { useEffect } from 'react';
import Login from './components/Login/LoginContainer';
import Join from './components/join/Join';
import { Route, Switch } from 'react-router-dom';
import Router from './routes/routes';
import LayoutContainer from './components/layout/LayoutContainer';
import { useSelector } from 'react-redux';

const App = () => {
  useEffect(() => {
    console.log('가자 삥삥!');
  });
  const isLoggedIn = useSelector((state) => state.auth.status.isLoggedIn);
  return (
    <>
      {isLoggedIn ? (
        <LayoutContainer>
          <Router />
        </LayoutContainer>
      ) : (
        <Switch>
          <Route path="/" component={Login} exact={true} />
          <Route path="/join" component={Join} />
        </Switch>
      )}
    </>
  );
};

export default App;
