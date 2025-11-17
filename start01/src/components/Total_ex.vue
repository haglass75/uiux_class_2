<template>
  <div>
    <h2>🛍 장바구니</h2>
    <p>👤 사용자 ID : {{ cart.userId }}</p>

    <!-- 상품 리스트 -->
    <div v-for="(item, index) in cart.items" :key="index" class="item">
      <p>{{ item.name }} ({{ formatNumber(item.price) }}원)</p>
      <input type="number" v-model="item.qty" min="0" />
      <span>개</span>
      <p>소계 : {{ formatNumber(item.price * item.qty) }}원</p>
      <hr />
    </div>

    <!-- 배송비, 쿠폰 -->
    <p>🚚 배송비 : {{ formatNumber(cart.shipping) }}원</p>
    <p>🎟 쿠폰 할인 : -{{ formatNumber(cart.coupon) }}원</p>

    <!-- 총합 -->
    <h3>💰 총 결제금액 : {{ formatNumber(total) }}원</h3>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from "vue";

// 장바구니 (reactive로 묶어서 사용)
const cart = reactive({
  userId: "user123", // 사용자 ID (더미데이터)
  items: [
    { name: "🍕 피자", price: 12000, qty: 1 }, // 쿼‧너‧티
    { name: "🍔 햄버거", price: 8000, qty: 2 },
    { name: "🥤 콜라", price: 2000, qty: 3 },
  ],
  shipping: 3000, // 배송비 (더미데이터)
  coupon: 2000, // 할인 쿠폰 금액 (더미데이터)
});

// 총합 (상품합계 + 배송비 - 쿠폰)
const total = computed(() => {
  const itemsTotal = cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  return itemsTotal + cart.shipping - cart.coupon;
});

// watch 예제 → 총합이 바뀔 때 실행
watch(total, (newVal, oldVal) => {
  console.log(`총합 바뀜: ${oldVal} → ${newVal}`);
  if (newVal > 50000) {
    alert("장바구니가 5만원을 넘었어요! 🎉");
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
