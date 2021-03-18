import { createWebHistory, createRouter } from "vue-router";
import login from "../components/LoginPage";
import home from "../views/Home.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/",
    name: "home",
    component: home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
