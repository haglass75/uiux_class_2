<template>
  <div class="app">
    <h2>🎨 Vue + Sass 기초 연습</h2>
    <!-- <MyButton label="기본 버튼" />
    <MyButton label="위험 버튼" class="danger" /> -->
    <Product />
  </div>
</template>

<script setup>
import Product from "./components/Product.vue";

// import MyButton from "./components/MyButton.vue";
</script>

<style lang="scss" scoped>
// @import "@/assets/styles/variables";
// @import "@/assets/styles/mixins";

// .app {
//   text-align: center;
//   padding: 20px;

//   .btn.danger {
//     @include button-style($danger-color);
//   }
// }
</style>
