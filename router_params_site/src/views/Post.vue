<template>
  <div class="card">
    <h2>📝 게시글 상세</h2>
    <p>글 번호: {{ postId }}</p>
    <p>제목: {{ post?.title }}</p>
    <p>내용: {{ post?.content }}</p>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const postId = route.params.postId;

// 간단한 가짜 게시글 데이터
const posts = {
  101: { title: "Vue 시작하기", content: "Vue는 쉽고 재미있어요 🎉" },
  202: { title: "Vue Router 배우기", content: "params로 주소에서 값 가져오기!" },
};

const post = posts[postId];
</script>
<style lang="scss" scoped>
@import "../assets/styles/card.scss";
// @import "../assets/styles/card.scss";
</style>
