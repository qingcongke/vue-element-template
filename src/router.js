import Vue from "vue";
import Router from "vue-router";

import Login from "./views/Login";
import NotFound from "./views/404";
import store from "./store";

import Index from "./views/Index";
import Account from "./views/admin/Account";
import Home from "./views/Home";

Vue.use(Router);

const router = new Router({
  //mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      meta: { requireAuth: false },
      component: resolve => require(["./views/Login"], resolve)
    },

    {
      path: "/index",
      name: "index",
      component: Index,
      children: [
        {
          path: "/account",
          name: "账号管理",
          component: Account
        }
      ]
    },
    {
      path: "/404",
      name: "notfound",
      component: NotFound
    }
  ]
});

allRoutes: [
  {
    path: "/1-0",
    name: "1-0",
    component: Index,
    children: [
      {
        path: "/1-1",
        name: "1-1",
        component: Account
      }
    ]
  },
  {
    path: "/2-0",
    name: "2-0",
    component: Index,
    children: [
      {
        path: "/2-1",
        name: "2-1",
        component: Account
      }
    ]
  }
];

//路由守卫
router.beforeEach((to, from, next) => {
  if (to.path == "/") {
    next("/login");
  } else {
    if (to.matched.length === 0) {
      next({
        path: "/404" //跳转错误页面
      });
    }
  }

  if (to.path == "/login") {
    next();
  } else {
    let token = store.state.token;
    let auth = store.state.auth;
    let username = localStorage.getItem("username");

    let level = localStorage.getItem("level");
    // console.log("========================");
    // console.log(token);
    // console.log(username);
    // console.log(level);
    // console.log(auth);
    // console.log("========================");
    // console.log(!token || !auth || !username || !level);

    if (!token || !auth || !username || !level) {
      next("/login");
    }
    next();
  }
});

export default router;
