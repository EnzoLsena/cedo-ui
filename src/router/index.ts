import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      meta: {
        requiresAuth: true,
      },
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
  ],
});

router.beforeEach((to) => {
  const requiresAuth = to.meta.requiresAuth;
  const token = localStorage.getItem("accessToken");

  if (requiresAuth && !token) {
    return { name: "login" };
  }

  if (to.name === "login" && token) {
    return { name: "home" };
  }
});

export default router;
