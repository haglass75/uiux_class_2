// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import ProductDetail from "@/views/ProductDetail.vue";
// 페이지 가져오기
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Cart from "@/views/Cart.vue";
import ProductsVue from "@/views/Products.vue";
// 페이지 주소와 연결
const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/cart", component: Cart },
  { path: "/products", component: ProductsVue },
  // 상품 상세 페이지, params 사용
  { path: "/products/:name/:price", component: ProductDetail },
];

// 라우터 생성
// 라우터 만들기 (길 안내 지도 같은 것)
// createRouter() → "길을 만드는 도구"
const router = createRouter({
  // createWebHistory() → 브라우저 주소창에 /home , /about 같은 주소를 보여줌
  history: createWebHistory(), // 브라우저 주소 표시줄에 경로가 보이게 함 (깜짝 주소 안 쓰고 진짜 주소처럼 보이게!)

  // routes → 우리가 정해둔 길(페이지들)을 가져다 씀
  routes, // 경로 정의 ("/home" 가면 Home.vue , "/about" 가면 About.vue)
});

// 다른 파일에서도 이 router를 쓸 수 있게 내보내기
export default router;
