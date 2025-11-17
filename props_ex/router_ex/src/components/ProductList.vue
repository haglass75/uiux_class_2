<!-- ProductList.vue -->
<template>
  <div class="list">
    <div v-for="item in products" :key="item.id" class="card">
      <img :src="item.img" />
      <h3>{{ item.name }}</h3>
      <p>{{ item.price }}원</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["products"]);
</script>

<style scoped>
.list {
  display: flex;
  gap: 12px;
}
.card {
  width: 150px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
}
.card img {
  width: 100%;
  border-radius: 6px;
}
</style>
