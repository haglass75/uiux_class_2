<template>
  <div>
    <Local_ex01 />
    <hr />
    <hr />
    <hr />
    <hr />
    <Local_ex2 />
    <hr />
    <hr />
    <hr />
    <hr />
    <div class="wrap">
      <Reser />
      <hr />
      <hr />
      <hr />
      <Login />
    </div>

    <!-- <Re_Review /> -->
  </div>
</template>
<script setup>
import Local_ex01 from "./components/Local_ex01.vue";
import Local_ex2 from "./components/Local_ex2.vue";
import Reser from "./components/Reser.vue";
import Re_Review from "./components/Re_Review.vue";
import Login from "./components/Login.vue";
</script>

<style scoped>
.wrap{
  display: flex;
}
</style>
