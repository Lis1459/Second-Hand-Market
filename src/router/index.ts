import { createRouter, createWebHistory } from "vue-router";
import AllShopsView from "../views/AllShopsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: AllShopsView,
    },
    {
      path: "/reserved",
      name: "reserved",
      component: () => import("../views/ReservedView.vue"),
    },
  ],
});

export default router;
