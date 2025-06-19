import Vue from "vue";
import VueRouter from "vue-router";
import Introduce from "../components/Introduce";
import Login from "../components/Login";

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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
