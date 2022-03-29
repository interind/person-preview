import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from '../views/HomePage';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/preview',
    name: 'PreviewPage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PreviewPage')
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
