<template>
  <div class="box">
    <h2>🧳 예약하기</h2>

    <input v-model="name" placeholder="이름" />
    <input type="date" v-model="date" />
    <select v-model="service">
      <option disabled value="">서비스 선택</option>
      <option>짐보관</option>
      <option>제빙기 청소</option>
    </select>

    <button @click="saveReservation">💾 예약 저장하기</button>

    <hr />

    <h3>📃 예약 내역</h3>
    <div v-for="(res, i) in reservations" :key="i" class="reservation">
      <p>👤 이름: {{ res.name }}</p>
      <p>📅 날짜: {{ res.date }}</p>
      <p>🛠 서비스: {{ res.service }}</p>
      <button @click="deleteReservation(i)">🗑️ 삭제</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const name = ref("");
const date = ref("");
const service = ref("");
const reservations = ref([]);

// 페이지 열릴 때 localStorage에서 불러오기
onMounted(() => {
  const saved = localStorage.getItem("reservations");
  if (saved) {
    reservations.value = JSON.parse(saved);
  }
});

// 예약 저장하기
const saveReservation = () => {
  if (!name.value || !date.value || !service.value) {
    alert("모든 항목을 입력해주세요!");
    return;
  }

  const newRes = {
    name: name.value,
    date: date.value,
    service: service.value,
  };

  reservations.value.push(newRes);
  localStorage.setItem("reservations", JSON.stringify(reservations.value));

  alert("예약이 저장됐어요!");

  // 입력창 초기화
  name.value = "";
  date.value = "";
  service.value = "";
};

// 예약 삭제하기
const deleteReservation = (index) => {
  if (confirm("정말 삭제할까요?")) {
    reservations.value.splice(index, 1);
    localStorage.setItem("reservations", JSON.stringify(reservations.value));
  }
};
</script>

<style scoped>
.box {
  width: 350px;
  margin: 40px auto;
  padding: 20px;
  background: #f4f7ff;
  border-radius: 12px;
}
input,
select {
  width: 100%;
  padding: 6px;
  margin-bottom: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
button {
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  border: none;
  background: #0a66c2;
  color: white;
  cursor: pointer;
  margin-top: 5px;
}
button:hover {
  background: #004a99;
}
.reservation {
  background: white;
  border-radius: 8px;
  padding: 10px;
  margin-top: 10px;
}
</style>
