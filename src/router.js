import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';


function RouterConfig({ app, history }) {
  const routesConfig = [
    {
      path: '/',
      component: () => import('./routes/user/'),
      models: () => [import('./models/user')]
    },
    {
      path: '/user/:id',
      component: () => import('./routes/user/detail'),
      models: () => [import('./models/user')]
    }
  ];
  return (
    <Router history={history}>
      <Switch>
        {/*<Route path="/" exact component={IndexPage} />*/}
        {
          routesConfig.map(({ path, ...dynamics }) => {
            return <Route key={path} exact  path={path} component={dynamic({
              app,
              ...dynamics
            })} />
          })
        }
      </Switch>
    </Router>
  );
}

export default RouterConfig;
