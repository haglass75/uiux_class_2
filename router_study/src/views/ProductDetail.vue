<template>
  <div>
    <!-- 목록으로 돌아가는 버튼 -->
    <button @click="goBack">⬅️ 목록으로 돌아가기</button>
    <h1>📦 상품 상세</h1>
    <p>상품 이름: {{ name }}</p>
    <p>가격: {{ price }}원</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router"; // 라우터에서 정보 가져오기
// useRoute() = "현재 위치 확인"
// useRouter() = "다른 곳으로 이동"
// 지금 내가 있는 페이지 정보(주소)를 읽어오는 도구예요.
// 지금 페이지의 주소와 정보를 가져옴
const route = useRoute(); // 현재 페이지 정보 가져오기
// 다른 페이지로 이동하게 도와주는 도구예요.
// 다른 페이지로 이동시킴
const router = useRouter();
// URL에서 params 가져오기
const name = ref(route.params.name);
const price = ref(route.params.price);
// 돌아가기 함수
// const goBack = () => {
//   router.push("/"); // 처음 페이지(상품 목록)으로 이동
// };
// 돌아가기 함수
const goBack = () => {
  router.back(); // 바로 전 페이지로 이동 (브라우저 뒤로가기와 같음)
};
</script>
