import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '@/views/layout/Layout.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: { hidden: true },
  },
  {
    path: '/',
    component: Layout,
    redirect: '/Home',
    name: 'Home',
    meta: { title: '主页', icon: 'zhuye' },
    children: [{
      path: 'home',
      component: () => import('@/views/Home.vue')
    }]
    // redirect: '/dashboard',
    // name: 'Dashboard',
    // meta: { title: '主页', icon: 'zhuye' },
    // children: [{
    //   path: 'dashboard',
    //   component: () => import(/* webpackChunkName: "Dashboard" */ '@/views/dashboard/index.vue'),
    // }],
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
    meta: { hidden: true },
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  base: process.env.BASE_URL,
  routes
})

export default router
