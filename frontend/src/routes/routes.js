import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { myCar, oil, addMyCar, enginOil, myPage, myPageForm } from './index';

const routes = () => (
  <Switch>
    <Route path="/" exact component={myCar} />
    <Route path="/oil" component={oil} />
    <Route path="/mycar" component={addMyCar} />
    <Route path={`/enginoil/:pageNumber`} component={enginOil} />
    <Route path="/mypage" exact component={myPage} />
    <Route path={`/mypage/:name`} component={myPageForm} />
  </Switch>
);

export default routes;
