<template>
  <div>
    <!-- <h1>회원 목록</h1> -->
    <MemberCard v-for="(user, index) in users" :key="index" :member="user" />
  </div>
</template>

<script setup>
import MemberCard from "./MemberCard.vue";

const users = [
  { name: "경미", age: 25, email: "k@naver.com", vip: true },
  { name: "민수", age: 30, email: "m@gmail.com", vip: false },
  { name: "지우", age: 22, email: "j@naver.com", vip: true },
];
</script>
<style scoped></style>
