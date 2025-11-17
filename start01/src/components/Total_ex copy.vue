<template>
  <div>
    <h2>🛍 장바구니</h2>

    <!-- 상품 리스트 -->
    <div v-for="(item, index) in cart.items" :key="index" class="item">
      <p>{{ item.name }} ({{ formatNumber(item.price) }}원)</p>
      <input type="number" v-model="item.qty" min="0" />
      <span>개</span>
      <p>소계 : {{ formatNumber(item.price * item.qty) }}원</p>
      <hr />
    </div>

    <!-- 총합 -->
    <h3>총 결제금액 : {{ formatNumber(total) }}원</h3>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue";

// 장바구니 (reactive로 묶어서 사용)
const cart = reactive({
  items: [
    { name: "🍕 피자", price: 12000, qty: 1 }, //쿼‧너‧티
    { name: "🍔 햄버거", price: 8000, qty: 2 },
    { name: "🥤 콜라", price: 2000, qty: 3 },
  ],
  shipping: 3000, // 배송비
  coupon: 2000, // 할인 쿠폰 금액
});

// 총합 (computed로 자동 계산)
const total = computed(() => {
  // reduce() 배열 안에 있는 값들을 하나로 합쳐주는 도구야.
  // 쉽게 말하면, 숫자 여러 개를 더하거나 곱해서 "최종 값"을 만드는 것이야.
  //   reduce() 구조
  // array.reduce((acc, cur) => {
  //   // acc = 지금까지 합쳐진 값
  //   // cur = 현재 배열의 값
  //   return 새로운_acc;
  // }, 초기값);
  return cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);
});

// watch 예제 → 총합이 바뀔 때 실행
watch(total, (newVal, oldVal) => {
  console.log(`총합 바뀜: ${oldVal} → ${newVal}`);
  if (newVal > 30000) {
    alert("장바구니가 3만원을 넘었어요! 🎉");
  }
});

// 숫자 천단위 콤마
const formatNumber = (num) => {
  return num.toLocaleString();
};
</script>

<style scoped>
.item {
  margin-bottom: 10px;
}
input {
  width: 50px;
  margin: 0 5px;
}
</style>
