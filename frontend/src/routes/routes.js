import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { myCar, oil, addMyCar, enginOil, myPage, test } from './index';

const routes = () => (
  <Switch>
    <Route path="/index" component={myCar} />
    <Route path="/oil" component={oil} />
    <Route path="/mycar" component={addMyCar} />
    <Route path={`/enginoil/:pageNumber`} component={enginOil} />
    <Route path="/mypage" component={myPage} />
    <Route path="/test" component={test} />
  </Switch>
);

export default routes;
