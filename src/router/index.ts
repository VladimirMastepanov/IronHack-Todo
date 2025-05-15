import { ref } from "vue";
import { createRouter, createWebHistory } from "vue-router";

const Dashboard = () => import("../pages/Dashboard.vue");
const AuthComponent = () => import("../pages/AuthComponent.vue");
const NotFound = () => import("../pages/NotFound.vue");
const LoginForm = () => import("../pages/LoginForm.vue");

export const isAuth = ref(false);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/auth",
    name: "AuthComponent",
    component: AuthComponent,
    children: [
      {
        path: "login",
        name: "Login",
        component: AuthComponent,
        props: { mode: "login" },
      },
      {
        path: "signin",
        name: "Signin",
        component: AuthComponent,
        props: { mode: "signin" },
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuth.value && to.name !== "AuthComponent") {
    return { name: "AuthComponent" };
  }
});

export default router;
