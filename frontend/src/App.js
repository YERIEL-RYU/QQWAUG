import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import Join from './components/join/Join';
import { Route, Switch } from 'react-router-dom';
import { signIn } from './components/auth';
import Router from './routes/routes';
import LayoutContainer from './components/layout/LayoutContainer';
require('dotenv').config();

const App = () => {
  useEffect(() => {
    console.log('가자 삥삥!');
  });

  const [user, setUser] = useState(null);
  const authenticated = user != null;

  const login = ({ email, password }) => setUser(signIn({ email, password }));
  //const logout = () => setUser(null);

  return (
    <Switch>
      <Route
        path="/"
        render={(props) => (
          <Login authenticated={authenticated} login={login} {...props} />
        )}
        exact={true}
      />
      <Route path="/join" component={Join} />
      <LayoutContainer>
        <Router />
      </LayoutContainer>
    </Switch>
  );
};

export default App;
