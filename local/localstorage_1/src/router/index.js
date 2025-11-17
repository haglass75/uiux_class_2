import { createRouter, createWebHistory } from "vue-router";
import Reserve from "../views/Reserve.vue";
import Confirm from "../views/Confirm.vue";
import HomeVue from "@/views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import ReviewVue from "@/views/Review.vue";
const routes = [
  { path: "/", component: HomeVue },
  // { path: "/", redirect: "/signup" }, // 기본 경로는 회원가입
  { path: "/signup", component: Signup },
  { path: "/login", component: Login },
  { path: "/reserve", component: Reserve },
  { path: "/confirm", component: Confirm },
  { path: "/review", component: ReviewVue },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
