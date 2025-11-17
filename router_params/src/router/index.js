// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Product from "@/views/Product.vue";
import User from "@/views/User.vue";
import PostVue from "@/views/Post.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/product/:id", component: Product }, // 상품 번호 받기
  { path: "/user/:username", component: User }, // 유저 이름 받기
  { path: "/post/:postId", component: PostVue }, // 게시글 id 받기
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
