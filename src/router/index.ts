import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Layout from "@/views/layout/Layout.vue";
import LoginCallback from "../views/loginCallback/index.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/login/index.vue"),
    meta: { hidden: true },
  },
  {
    path: "/",
    component: Layout,
    redirect: "/Home",
    name: "Home",
    meta: { title: "队伍审核", icon: "zhuye" },
    children: [
      {
        path: "Home",
        component: () => import("@/views/dashboard/index.vue"),
      },
    ],
  },
  {
    path: "/examine",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Examine",
        component: () =>
          import(
            /* webpackChunkName: "form" */ "@/views/ManageExamine/index.vue"
          ),
        meta: { title: "项目测验", icon: "tubiaozhizuomoban-x-" },
      },
    ],
  },
  {
    path: "/notification",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Notification",
        component: () =>
          import(
            /* webpackChunkName: "form" */ "@/views/Notification/index.vue"
          ),
        meta: { title: "公告发布", icon: "chengchang" },
      },
    ],
  },
  {
    path: "/guide",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Guide",
        component: () =>
          import(/* webpackChunkName: "form" */ "@/views/Guide/index.vue"),
        meta: { title: "资料发布", icon: "shujuzhongxin" },
      },
    ],
  },
  {
    path: "/note",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Note",
        component: () =>
          import(/* webpackChunkName: "form" */ "@/views/Note/index.vue"),
        meta: { title: "留言管理", icon: "speak" },
      },
    ],
  },
  {
    path: "/login/callback",
    component: LoginCallback,
    meta: { hidden: true },
  },
  {
    path: "/404",
    component: () => import(/* webpackChunkName: "404" */ "@/views/404.vue"),
    meta: { hidden: true },
  },
];

const router = new VueRouter({
  mode: "history",
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  base: process.env.BASE_URL,
  routes,
});

export default router;
