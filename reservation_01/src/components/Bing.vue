<template>
  <div>
    <h2>🧊 제빙기 청소 예약</h2>

    <!-- 가게 이름 -->
    <input v-model="form.store" placeholder="가게 이름 입력" />

    <!-- 제빙기 개수 선택 -->
    <select v-model="form.qty">
      <option disabled value="">제빙기 개수 선택</option>
      <option v-for="n in 3" :key="n" :value="n">{{ n }}대</option>
    </select>

    <!-- 청소 날짜 -->
    <input type="date" v-model="form.date" />

    <!-- 예약 버튼 -->
    <button @click="submit">예약하기</button>

    <hr />

    <!-- 예약 확인 -->
    <div v-if="reserved">
      <h3>✅ 예약 확인</h3>
      <p>가게 이름 : {{ form.store }}</p>
      <p>제빙기 개수 : {{ form.qty }}대</p>
      <p>청소 날짜 : {{ form.date }}</p>
      <p>💰 요금 : {{ totalPrice }}원</p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch } from "vue";

// 예약 입력값
const form = reactive({
  store: "",
  qty: "",
  date: ""
});

// 예약 완료 여부
const reserved = ref(false);

// 요금 계산 (한 대당 50,000원)
const totalPrice = computed(() => {
  return form.qty ? form.qty * 50000 : 0;
});

// 예약 버튼
const submit = () => {
  if (!form.store || !form.qty || !form.date) {
    alert("모든 내용을 입력해주세요!");
    return;
  }
  reserved.value = true;
};

// 감시 (watch)
watch(() => form.qty, (newVal) => {
  if (newVal == 3) {
    alert("⚠️ 3대 이상 청소는 상담이 필요합니다.");
  }
});
</script>

<style scoped>
input, select {
  margin: 5px;
  padding: 5px;
}
button {
  margin: 10px 0;
}
</style>
