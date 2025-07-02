import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "@/components/home";
import CustomerDetail from "@/components/customer-detail";
import PersonalDetail from "@/components/personal-detail";
import Comment from "@/components/comment";

const routes = [
  { path: "/", component: HelloWorld },
  { path: "/customer-detail", component: CustomerDetail },
  { path: "/personal-detail", component: PersonalDetail },
  { path: "/comment", component: Comment },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
