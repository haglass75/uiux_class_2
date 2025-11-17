<template>
  <div>
    <h2>🛍 상품 목록</h2>

    <!-- 상품 하나 -->
    <div class="product">
      <p>상품명: 아이스크림</p>
      <p>가격: 3000원</p>
      <p>재고: {{ stock }}개</p>

      <!-- 품절 여부 -->
      <p v-if="stock === 0" class="soldout">❌ 품절</p>
      <p v-else class="instock">✅ 구매 가능</p>

      <button @click="addToCart" :disabled="stock === 0">장바구니 담기</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 초기 재고 3개
const stock = ref(3);

const addToCart = () => {
  if (stock.value > 0) {
    stock.value--; // 재고 1 줄이기
  }
};
</script>

<style scoped>
.product {
  border: 1px solid #ddd;
  padding: 10px;
  margin-top: 10px;
  width: 200px;
}
.soldout {
  color: red;
  font-weight: bold;
}
.instock {
  color: green;
  font-weight: bold;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
