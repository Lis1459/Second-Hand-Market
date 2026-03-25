import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth.store";
import AllShopsView from "../views/AllShopsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/",
      name: "home",
      component: AllShopsView,
      meta: { requiresAuth: true },
    },
    {
      path: "/reserved",
      name: "reserved",
      component: () => import("../views/ReservedView.vue"),
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from) => {
  const authStore = useAuthStore();

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !authStore.isAuthenticated) {
    return { name: "/login" };
  } else if (to.name === "login" && authStore.isAuthenticated) {
    return { name: "home" };
  } else {
    return true;
  }
});

export default router;
