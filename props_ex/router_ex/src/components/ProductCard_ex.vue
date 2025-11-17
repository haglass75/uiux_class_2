<!-- ProductCard.vue -->
<template>
  <div class="card">
    <img :src="img" :alt="name" />
    <h3>{{ name }}</h3>
    <p>{{ desc }}</p>
  </div>
</template>

<script setup>
const props = defineProps(["img", "name", "desc"]);
</script>

<style scoped>
.card {
  width: 180px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
}
.card img {
  width: 100%;
  border-radius: 6px;
}
</style>
