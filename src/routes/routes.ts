import React from 'react';

const Home = React.lazy(() => import('../pages/Movies/Movies'));
const Movie = React.lazy(() => import('../pages/Movie/Movie'));

// every object will be a route and there are no nested objects, just nested paths
const Routes = [
  {
    path: '/',
    key: 'ROOT',
    exact: true,
    component: Home,
  },
  {
    path: '/movie/:id',
    key: 'MOVIE',
    exact: true,
    component: Movie,
  },
];

export default Routes;
