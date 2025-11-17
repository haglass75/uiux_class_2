import { createRouter, createWebHistory } from "vue-router";
import Intro from "@/views/Intro.vue";
import Main from "@/views/Main.vue";

const routes = [
  { path: "/", component: Intro },   // 첫 화면 (인트로 영상)
  { path: "/main", component: Main } // 메인 페이지
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
