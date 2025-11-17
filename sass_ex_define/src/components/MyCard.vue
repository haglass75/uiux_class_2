<template>
  <div class="card">
    <h3>{{ title }}</h3>
    <p>{{ content }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  content: String,
});
</script>

<style lang="scss" scoped>
@import "../style/variables";
.card {
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  h3 {
    margin-bottom: 8px;
    color: $main-color;
  }
}
</style>
