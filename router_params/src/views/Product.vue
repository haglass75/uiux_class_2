<!-- Product.vue -->
<template>
  <div>
    <h2>🛍 상품 상세 페이지</h2>
    <!-- //   :id 같은 부분은 "주소에서 값 받아오기" 약속이에요.

// route.params.id → 그 값(번호, 이름 등)을 꺼내오는 코드예요. -->
    <p>상품 번호: {{ route.params.id }}</p>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute(); // 현재 페이지의 정보를 가져옴
</script>
