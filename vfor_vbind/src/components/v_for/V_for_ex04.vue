<template>
  <div>
    <h2>🛍 상품 목록</h2>
    <div v-for="(product, index) in products" :key="index" class="item">
      <p>{{ product.name }} - {{ product.price.toLocaleString() }}원</p>
      <p>
        <!-- 꽉 찬 별 -->
        <span v-for="n in Math.floor(product.rating)" :key="'full' + n" class="star full">★</span>

        <!-- 반쪽 별 -->
        <span v-if="product.rating % 1 !== 0" class="star half">★</span>

        <!-- 빈 별 -->
        <span v-for="n in 5 - Math.ceil(product.rating)" :key="'empty' + n" class="star empty">★</span>
      </p>
      <hr />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 상품 데이터 (별점 포함, 소수점 가능)
const products = ref([
  { name: "피자", price: 12000, rating: 4.5 },
  { name: "햄버거", price: 8000, rating: 4 },
  { name: "콜라", price: 2000, rating: 3.5 },
]);
</script>

<style scoped>
.item {
  margin-bottom: 10px;
}
.stars {
  font-size: 2rem;
  color: lightgray;
}

/* 꽉 찬 별 */
.star.full {
  color: gold;
}

/* 빈 별 */
.star.empty {
  color: lightgray;
}

/* 반쪽 별 */
.star.half {
  position: relative;
  display: inline-block;
  color: lightgray; /* 먼저 회색 별 찍고 */
}
.star.half::before {
  content: "★";
  position: absolute;
  left: 0;
  width: 50%; /* 절반만 칠하기 */
  overflow: hidden;
  color: gold;
}
</style>
