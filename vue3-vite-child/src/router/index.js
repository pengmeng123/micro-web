import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "@/components/home";
import CustomerDetail from "@/components/customer-detail";

const routes = [
  { path: "/", component: HelloWorld },
  { path: "/customer-detail", component: CustomerDetail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
