<template>
  <div>
    <h2>📦 예약 목록 지난날짜 자동 완료처리</h2>

    <!-- 총 예약 개수 -->
    <p>총 예약: {{ totalReservations }} 건</p>

    <!-- 예약 추가 폼 -->
    <form class="form" @submit.prevent="addReservation">
      <input v-model="newName" placeholder="고객 이름" />
      <select v-model="newService">
        <option value="" disabled>서비스 선택</option>
        <option value="짐 보관">짐 보관</option>
        <option value="제빙기 청소">제빙기 청소</option>
      </select>
      <input type="date" v-model="newDate" />
      <button type="submit">예약 추가</button>
    </form>

    <!-- 예약 리스트 -->
    <div v-for="(item, index) in reservations" :key="index" class="card">
      <p>고객명: {{ item.name }}</p>
      <p>서비스: {{ item.service }}</p>
      <p>날짜: {{ item.date }}</p>

      <!-- 예약 상태 -->
      <p v-if="item.done" class="done">✅ 완료</p>
      <p v-else class="waiting">⏳ 대기중</p>

      <!-- 상태 바꾸기 버튼 -->
      <button @click="toggleStatus(index)">상태 바꾸기</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch } from "vue";

// 예약 데이터 (reactive 배열)
const reservations = reactive([
  { name: "홍길동", service: "짐 보관", date: "2025-09-20", done: false },
  { name: "김철수", service: "제빙기 청소", date: "2025-10-01", done: false },
]);

// 새 예약 입력값
const newName = ref("");
const newService = ref("");
const newDate = ref("");

// 예약 추가 함수
const addReservation = () => {
  if (!newName.value || !newService.value || !newDate.value) {
    alert("이름, 서비스, 날짜를 모두 입력하세요!");
    return;
  }
  reservations.push({
    name: newName.value,
    service: newService.value,
    date: newDate.value,
    done: false,
  });
  // 입력창 초기화
  newName.value = "";
  newService.value = "";
  newDate.value = "";
};

// 완료/대기 상태 토글
const toggleStatus = (index) => {
  reservations[index].done = !reservations[index].done;
};

// 예약 총 개수 (computed)
const totalReservations = computed(() => reservations.length);

// 오늘 날짜
const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

// watch: 날짜가 지났으면 자동 완료 처리
watch(
  reservations,
  (newVal) => {
    console.log(newVal);

    newVal.forEach((item) => {
      if (item.date < today) {
        item.done = true; // 날짜가 오늘보다 이전이면 완료 처리
      }
    });
  },
  { deep: true, immediate: true } // 깊게 감시 + 처음 실행 시에도 체크
  //   deep: true → 예약 배열 안에 있는 item.done 같은 속성도 감시

  // immediate: true → 앱 켜지자마자 지난 날짜는 바로 완료 처리

  // 🧑‍🏫 쉽게 말하면

  // deep: true 👉 "집 안 구석구석까지 감시"

  // immediate: true 👉 "문 열자마자 바로 검사 시작"
);
</script>

<style scoped>
.form {
  margin-bottom: 15px;
}
.form input,
.form select {
  margin-right: 5px;
  padding: 5px;
}
.card {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  width: 250px;
}
.done {
  color: green;
  font-weight: bold;
}
.waiting {
  color: orange;
  font-weight: bold;
}
</style>
