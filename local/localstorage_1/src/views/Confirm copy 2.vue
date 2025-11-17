<template>
  <div>
    <h2>🔍 예약 목록</h2>
    <p>회원: {{ loggedInUser }}</p>
    <div v-if="reservations.length > 0">
      <ul>
        <li v-for="item in reservations" :key="item.id">
          {{ item.name }} - {{ item.date }}
          <span v-if="isPast(item.date)">✅ 완료</span>
          <span v-else>⏳ 예약중</span>
          <button @click="cancelReservation(item.id)">❌ 취소</button>
        </li>
      </ul>
    </div>

    <div v-else>
      <p>❌ 예약 정보가 없습니다.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const loggedInUser = ref("");
const reservations = ref([]);

onMounted(() => {
  const saved = localStorage.getItem("reservations");
  if (saved) {
    reservations.value = JSON.parse(saved);
  }
});

// 예약 취소
const cancelReservation = (id) => {
  reservations.value = reservations.value.filter((item) => item.id !== id);
  localStorage.setItem("reservations", JSON.stringify(reservations.value));
  alert("🚫 예약이 취소되었습니다.");
};

// 날짜가 지났는지 확인하는 함수
const isPast = (dateStr) => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  return dateStr < today;
};
</script>
