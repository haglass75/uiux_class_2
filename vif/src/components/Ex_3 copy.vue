<template>
  <div>
    <h2>🛍 상품 목록</h2>

    <!-- 상품 하나 -->
    <div class="product">
      <p>상품명: 아이스크림</p>
      <p>가격: 3000원</p>
      <!-- 품절 여부 -->
      <p v-if="isSoldOut" class="soldout">❌ 품절</p>
      <p v-else class="instock">✅ 구매 가능</p>

      <button @click="isSoldOut = !isSoldOut">상태 바꾸기</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// true = 품절, false = 재고 있음
const isSoldOut = ref(false);
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
</style>
