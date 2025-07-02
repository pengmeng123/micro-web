import Vue from "vue";
import VueRouter from "vue-router";
import Introduce from "../views/Introduce";
import Login from "../views/Login";
import Customer from "../views/Customer";
import Opportunity from "../views/Opportunity";
import Contact from "../views/Contact";
import Comment from "../views/Comment";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Introduce",
    component: Introduce,
    meta: {
      needLogin: 0,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      needLogin: 0,
    },
  },
  {
    path: "/customer",
    name: "Customer",
    component: Customer,
    meta: {
      layout: "default",
    },
  },
  {
    path: "/opportunity",
    name: "Opportunity",
    component: Opportunity,
    meta: {
      layout: "default",
    },
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
    meta: {
      layout: "default",
    },
  },
  {
    path: "/comment",
    name: "Comment",
    component: Comment,
    meta: {
      layout: "default",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
