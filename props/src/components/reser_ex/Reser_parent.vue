<template>
  <div>
    <h2>🎈 예약 페이지</h2>

    <!-- 자식에게 여러 개 props 전달 -->
    <ReserveButton :shop="'제빙기 청소샵'" :date="'2025-10-10'" :userName="'경미'" @reserve="showMessage" />
  </div>
</template>

<script setup>
import ReserveButton from "./ReserveButton.vue";

const showMessage = () => {
  alert("예약이 완료되었습니다! ✅");
};
</script>
