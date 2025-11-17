<template>
  <div class="form">
    <h2>📅 예약하기</h2>
    <input v-model="name" placeholder="이름 입력" />
    <input v-model="date" type="date" />
    <select v-model="service">
      <option value="">서비스 선택</option>
      <option>짐 보관</option>
      <option>제빙기 청소</option>
    </select>

    <button @click="saveBooking">예약 저장하기</button>

    <hr />
    <h3>🧾 저장된 예약 정보</h3>
    <p>이름: {{ saved.name }}</p>
    <p>날짜: {{ saved.date }}</p>
    <p>서비스: {{ saved.service }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// 입력값
const name = ref("");
const date = ref("");
const service = ref("");

// 저장된 예약 정보 보여주기용
const saved = ref({ name: "", date: "", service: "" });

// ✅ 예약 저장하기 함수
const saveBooking = () => {
  const bookingData = {
    name: name.value,
    date: date.value,
    service: service.value,
  };

  // localStorage에 저장 (문자로 변환)
  localStorage.setItem("booking", JSON.stringify(bookingData));
  alert("예약이 저장되었어요!");

  // 저장된 데이터 다시 화면에 표시
  saved.value = bookingData;
};

// ✅ 페이지 켜질 때 localStorage에서 불러오기
onMounted(() => {
  const stored = localStorage.getItem("booking");
  if (stored) {
    saved.value = JSON.parse(stored);
  }
});
</script>

<style scoped>
.form {
  width: 300px;
  margin: 40px auto;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 15px;
}
input,
select {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
}
button {
  width: 100%;
  padding: 10px;
  background: #0a84ff;
  color: white;
  border: none;
  border-radius: 10px;
}
</style>
