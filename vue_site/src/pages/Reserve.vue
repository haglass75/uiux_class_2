<template>
  <main class="reserve">
    <h1>🧹 예약 페이지</h1>
    <router-link to="/" class="btn">홈으로</router-link>
  </main>
</template>

<script setup></script>

<style scoped lang="scss">
.reserve {
  text-align: center;
  padding-top: 100px;
  color: rgb(20, 19, 19);
//   background: #333;
  height: 100vh;

  .btn {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    background: rgb(30, 30, 30);
    color: #fff;
    border-radius: 10px;
    text-decoration: none;
  }
}
</style>
