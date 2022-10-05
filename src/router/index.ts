import { createRouter, createWebHistory } from "vue-router";

import AboutView from "../views/AboutView.vue";
import HomeView from "../views/HomeView.vue";
import PlayView from "../views/PlayView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/play",
      name: "play",
      component: PlayView,
    },
    {
      path: "/leaderboard",
      name: "leaderboard",
      component: AboutView,
    },
    {
      path: "/statistics",
      name: "statistics",
      component: AboutView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
