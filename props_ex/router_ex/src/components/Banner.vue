<!-- Banner.vue -->
<template>
  <div class="banner" :style="{ backgroundImage: `url(${bg})` }">
    <h2>{{ title }}</h2>
  </div>
</template>

<script setup>
const props = defineProps(["title", "bg"]);
</script>

<style scoped>
.banner {
  height: 200px;
  background-size: cover;
  background-position: center;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
}
</style>
