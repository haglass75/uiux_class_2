<template>
  <div class="container">
    <Parent />
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
</template>
<script setup>
import Parent from "./components/Parent.vue";
import MemberParent from "./components/MemberParent.vue";
import { ref } from "vue";
import ReservationForm from "./components/ReservationForm.vue";
import Payment from "./components/Payment.vue";
import ReservationConfirm from "./components/ReservationConfirm.vue";
import Reser_parent from "./components/reser_ex/Reser_parent.vue";

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
