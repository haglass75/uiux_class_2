<template>
  <div>
    <h2>📅 예약하기</h2>
    <form @submit.prevent="saveReservation">
      <input v-model="name" placeholder="이름 입력" />
      <input v-model="date" type="date" />
      <button type="submit">예약 저장</button>
     
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 입력값
const name = ref("");
const date = ref("");

// 예약 저장 함수
const saveReservation = () => {
  // 예약정보 객체
  const reservation = {
    name: name.value,
    date: date.value,
  };

  // JSON으로 변환해서 로컬스토리지에 저장
  localStorage.setItem("reservation", JSON.stringify(reservation));

  alert("✅ 예약이 저장되었습니다!");
};
</script>
