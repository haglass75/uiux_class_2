<template>
  <div>
    <h2>🎒 짐 보관 예약</h2>

    <!-- 이름 입력 -->
    <input v-model="form.name" placeholder="이름 입력" />

    <!-- 짐 개수 선택 -->
    <select v-model="form.qty">
      <option disabled value="">짐 개수 선택</option>
      <option v-for="n in 5" :key="n" :value="n">{{ n }}개</option>
    </select>

    <!-- 날짜 선택 -->
    <input type="date" v-model="form.date" />

    <!-- 예약 버튼 -->
    <button @click="submit">예약하기</button>

    <hr />

    <!-- 예약 확인 (v-if로 조건 표시) -->
    <div v-if="reserved">
      <h3>✅ 예약 확인</h3>
      <p>이름 : {{ form.name }}</p>
      <p>짐 개수 : {{ form.qty }}개</p>
      <p>보관 날짜 : {{ form.date }}</p>
      <p>💰 요금 : {{ totalPrice }}원</p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch } from "vue";

// 예약 입력값 (reactive)
const form = reactive({
  name: "",
  qty: "",
  date: "",
});

// 예약 완료 여부 (ref)
const reserved = ref(false);

// 요금 계산 (computed)
const totalPrice = computed(() => {
  return form.qty ? form.qty * 5000 : 0; // 1개 5000원
});

// 예약 버튼 클릭
const submit = () => {
  if (!form.name || !form.qty || !form.date) {
    alert("모든 내용을 입력해주세요!");
    return;
  }
  reserved.value = true;
};

// 값이 바뀔 때마다 확인 (watch)
watch(
  () => form.qty,
  (newVal) => {
    if (newVal >= 5) {
      alert("최대 5개까지 보관 가능합니다!");
    }
  }
);
</script>

<style scoped>
input,
select {
  margin: 5px;
  padding: 5px;
}
button {
  margin: 10px 0;
}
</style>
