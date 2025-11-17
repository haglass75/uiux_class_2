import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import Reserve from "@/pages/Reserve.vue";
import DarkMode from "@/pages/DarkMode.vue";

const routes = [
  { path: "/", component: Home, name: "Home" },
  { path: "/reserve", component: Reserve, name: "Reserve" },
  { path: "/review", component: DarkMode, name: "DarkMode" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
