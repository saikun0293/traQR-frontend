import { createWebHistory, createRouter } from "vue-router";
import login from "../components/LoginPage";
import home from "../views/Home";
import StudentHome from "../components/StudentHome";
import FacultyHome from "../components/FacultyHome";

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
    children: [
      {
        path: "student",
        component: StudentHome,
      },
      {
        path: "faculty",
        component: FacultyHome,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
