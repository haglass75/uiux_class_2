<template>
  <div>
    <!-- 큰 제목 -->
    <h1>🛍 상품 목록</h1>

    <!-- 상품 리스트 -->
    <ul>
      <!-- 사과를 클릭하면 goDetail 함수가 실행됨 (이름: 사과, 가격: 1000) -->
      <li @click="goDetail('사과', 1000)">🍎 사과</li>

      <!-- 바나나를 클릭하면 goDetail 함수가 실행됨 (이름: 바나나, 가격: 2000) -->
      <li @click="goDetail('바나나', 2000)">🍌 바나나</li>

      <!-- 포도를 클릭하면 goDetail 함수가 실행됨 (이름: 포도, 가격: 3000) -->
      <li @click="goDetail('포도', 3000)">🍇 포도</li>
    </ul>

  </div>
</template>

<script setup>
// vue-router 가져오기 (페이지 이동할 때 사용)
import { useRouter } from "vue-router";

// router 변수 만들기 → 페이지 이동을 도와줌
// Vue에서는 한 페이지 안에서 여러 화면(목록, 상세, 로그인 등)을 보여줄 수 있어요.
// 근데 화면을 바꾸려면 "지금은 이 페이지 보여줘!" 하고 알려줄 도구가 필요해요.
// 그 도구가 바로 router이고, useRouter()를 쓰면 router를 꺼내 쓸 수 있어요.
const router = useRouter();

// 상품 이름(name)과 가격(price)을 받아서
// /products/이름/가격 이런 주소로 이동시켜주는 함수
const goDetail = (name, price) => {
  // 예: 사과 클릭 → /products/사과/1000 으로 이동
  router.push(`/products/${name}/${price}`);
};

</script>
