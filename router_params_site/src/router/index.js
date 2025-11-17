// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Product from "@/views/Product.vue";
import User from "@/views/User.vue";
import Post from "@/views/Post.vue";

const routes = [
  { path: "/", component: Home }, // 홈
  { path: "/product/:id", component: Product }, // 상품 페이지 (id 받음)
  { path: "/user/:username", component: User }, // 유저 페이지 (username 받음)
  { path: "/post/:postId", component: Post }, // 게시글 페이지 (postId 받음)
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
