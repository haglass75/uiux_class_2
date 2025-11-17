<template>
  <div>
    <h2>🔍 예약 확인</h2>
    <div v-if="reservation">
      <p>이름: {{ reservation.name }}</p>
      <p>날짜: {{ reservation.date }}</p>
      <button @click="cancelReservation">❌ 예약 취소</button>
    </div>
    <div v-else>
      <p>❌ 예약 정보가 없습니다.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const reservation = ref(null);

onMounted(() => {
  // 로컬스토리지에서 데이터 꺼내기
  const saved = localStorage.getItem("reservation");
  if (saved) {
    reservation.value = JSON.parse(saved); // 문자열 → 객체 변환
  }
});
// 예약 취소 함수
const cancelReservation = () => {
  localStorage.removeItem("reservation"); // 로컬스토리지에서 삭제
  reservation.value = null; // 화면에서도 지움
  alert("🚫 예약이 취소되었습니다.");
};
</script>
