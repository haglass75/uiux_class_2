<template>
  <div class="card">
    <h2>{{ name }}</h2>
    <p>{{ price.toLocaleString() }}원</p>
  </div>
</template>

<script setup>
// 부모로부터 데이터 받기
const props = defineProps(["name", "price"]);
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 16px;
  margin: 10px auto;
  width: 200px;
  text-align: center;
  background: #f9f9f9;
}
.card:hover {
  background: #e8f0fe;
}
</style>
