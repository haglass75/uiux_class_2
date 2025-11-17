<template>
  <div id="app">
    <!-- 라우터로 연결된 페이지(인트로, 메인 등)가 이 자리에서 바뀜 -->
    <router-view />
  </div>
</template>

<script setup>
// 여기에는 특별히 코드가 필요 없음
</script>

<style>
/* 전역 스타일 (공통 폰트, 색상 등) */
body {
  margin: 0;
  font-family: "Arial", sans-serif;
}
</style>
