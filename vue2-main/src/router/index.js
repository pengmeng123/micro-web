import Vue from "vue";
import VueRouter from "vue-router";
import Introduce from "../components/Introduce";
import Login from "../components/Login";
import Customer from "../views/Customer";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Introduce",
    component: Introduce,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/customer",
    name: "Customer",
    component: Customer,
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
