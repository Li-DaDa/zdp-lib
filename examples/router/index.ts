import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress'
import BaseLayout from '../layout/base-layout.vue'
import { routesGenerator } from '~/utils/route'

NProgress.configure({ showSpinner: false })

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'IndexPage',
    component: () => import(/* webpackChunkName: 'index-page' */'~/views/index.vue')
  },
  {
    path: '',
    name: 'BaseLayout',
    component: BaseLayout,
    children: routesGenerator(),
  }, 
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router;
