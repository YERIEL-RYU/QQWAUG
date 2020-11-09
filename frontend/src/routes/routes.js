import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { myCar, oil, addMyCar, enginOil, myPage } from './index';

const routes = () => (
  <Switch>
    <Route path="/" component={myCar} />
    <Route path="/oil" component={oil} />
    <Route path="/mycar" component={addMyCar} />
    <Route path={`/enginoil/:pageNumber`} component={enginOil} />
    <Route path="/mypage" component={myPage} />
  </Switch>
);

export default routes;
