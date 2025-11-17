<template>
  <div class="card">
    <h2>👤 유저 프로필</h2>
    <p>이름: {{ username }}</p>
    <p>자기소개: {{ userBio }}</p>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const username = route.params.username;

// 간단한 가짜 유저 데이터
const users = {
  kim: { bio: "안녕하세요! 저는 김씨에요 😀" },
  sara: { bio: "저는 여행을 좋아하는 Sara에요 🌍" },
};

const userBio = users[username]?.bio;
</script>
<style lang="scss" scoped>
@import "../assets/styles/card.scss";
</style>
