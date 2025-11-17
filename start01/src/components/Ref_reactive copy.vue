<template>
  <main class="booking">
    <h1>호텔 예약</h1>

    <!-- 날짜 선택 -->
    <label>
      체크인 날짜:
      <input type="date" v-model="checkIn" />
    </label>

    <label>
      체크아웃 날짜:
      <input type="date" v-model="checkOut" />
    </label>

    <!-- 인원 선택 -->
    <label>
      인원:
      <input type="number" v-model="people" min="1" />
    </label>

    <!-- 결과 -->
    <section class="result">
      <p>숙박 일수: {{ nights }} 박</p>
      <p>총 인원: {{ people }} 명</p>
      <p>총 금액: {{ totalPrice.toLocaleString() }} 원</p>
    </section>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";

// ✅ 단일 값: ref
const checkIn = ref("");
const checkOut = ref("");
const people = ref(1);

// ✅ 계산된 값: computed
const nights = computed(() => {
  if (!checkIn.value || !checkOut.value) return 0;
  const inDate = new Date(checkIn.value);
  const outDate = new Date(checkOut.value);
  const diff = (outDate - inDate) / (1000 * 60 * 60 * 24);
  return diff > 0 ? diff : 0;
});

// 1박 1인당 50,000원
const pricePerNight = 50000;
const totalPrice = computed(() => nights.value * people.value * pricePerNight);
</script>

<style scoped>
.booking {
  max-width: 400px;
  margin: auto;
  padding: 1rem;
  border-radius: 12px;
  background: #f9f9f9;
  font-family: sans-serif;
}
label {
  display: block;
  margin: 0.5rem 0;
}
input {
  margin-left: 0.5rem;
  padding: 0.3rem;
}
.result {
  margin-top: 1rem;
  padding: 0.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
</style>
