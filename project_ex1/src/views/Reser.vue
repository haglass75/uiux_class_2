<template>
  <div class="home">
    <h1>🏠 예약페이지</h1>
    <router-link to="/review" class="btn">리뷰 보러가기</router-link>
    <div class="section">
      <ReservationForm v-if="step === 'form'" @next="goToPayment" />
<!-- Vue에서는 : 기호는 "자바스크립트 값을 보내는 표시" 야 -->
 <!-- 즉, :는 “이건 변수야!” 라는 뜻이야. -->
      <Payment v-if="step === 'payment'" :reservation="reservation" @next="goToConfirm" />

      <ReservationConfirm v-if="step === 'confirm'" :reservation="reservation" />
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Payment from "@/components/reservation/Payment.vue";
import ReservationConfirm from "@/components/reservation/ReservationConfirm.vue";
import ReservationForm from "@/components/reservation/ReservationForm.vue";
// 단계
const step = ref("form");
const reservation = ref({});

const goToPayment = (data) => {
  console.log(data);
  
  reservation.value = data;
  step.value = "payment";
};

const goToConfirm = (data) => {
  reservation.value = data;
  step.value = "confirm";
  console.log(data);
  
};
</script>
<style lang="scss" scoped>
.home {
  padding-top: 100px;
  text-align: center;

  .btn {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    background: rgb(30, 30, 30);
    color: #fff;
    border-radius: 10px;
    text-decoration: none;
  }
  .section{
    max-width: 400px;
      margin: auto;
  }
}
</style>
