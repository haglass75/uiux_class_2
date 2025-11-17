<template>
  <div>
    <!-- 헤더 -->
    <Header :isDark="isDarkHeader" :lineColor="lineColor" />
    <!-- 페이지 내용 -->
    <router-view />
    <div class="container">
      <MemberParent class="container" />
    </div>
    <hr />
    <hr />
    <hr />
    <hr />
    <div class="app">
      <h1>📦 짐보관 & 제빙기 청소 예약</h1>

      <ReservationForm v-if="step === 'form'" @next="goToPayment" />

      <Payment v-if="step === 'payment'" :reservation="reservation" @next="goToConfirm" />

      <ReservationConfirm v-if="step === 'confirm'" :reservation="reservation" />
    </div>
    <hr />
    <hr />
    <hr />
    <hr />
    <hr />
    <Reser_parent />
  </div>
</template>
<script setup>
import MemberParent from "./components/MemberParent.vue";

import ReservationForm from "./components/ReservationForm.vue";
import Payment from "./components/Payment.vue";
import ReservationConfirm from "./components/ReservationConfirm.vue";
import Reser_parent from "./components/reser_ex/Reser_parent.vue";
import Header from "./components/Header.vue";
import { computed, ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";


// 현재 경로 가져오기
const route = useRoute();

// 페이지마다 헤더 색 다르게
// const isDarkHeader = computed(() => route.name === "Reserve"  );
const isDarkHeader = computed(() => ["Reserve", "DarkMode"].includes(route.name));

// theme 값이 바뀔 때 CSS 변수 색상 변경

// 💡 defineProps()는 부모 → 자식으로 데이터를 보낼 때만 사용!
// App.vue는 부모이기 때문에 defineProps() 필요 ❌
const lineColor = computed(() => (route.name === "Reserve" ? "#fff" : "#333"));
// 단계
const step = ref("form");
const reservation = ref({});

const goToPayment = (data) => {
  reservation.value = data;
  step.value = "payment";
};

const goToConfirm = (data) => {
  reservation.value = data;
  step.value = "confirm";
};
</script>

<style scoped>
.container {
  display: flex;
}
.app {
  max-width: 500px;
  margin: auto;
  font-family: "Arial", sans-serif;
  text-align: center;
}
</style>
