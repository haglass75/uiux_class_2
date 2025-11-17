<template>
  <div>
    <h2>🛍 상품 목록</h2>
    <div v-for="(product, index) in products" :key="index" class="item">
      <p>{{ index + 1 }}. {{ product.name }} - {{ product.price }}원</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const products = ref([
  { name: "피자", price: 12000 },
  { name: "햄버거", price: 8000 },
  { name: "콜라", price: 2000 },
]);
</script>

<style scoped>
.item {
  margin: 5px 0;
}
</style>
