<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const postId = route.params.postId;
const post = ref(null);

onMounted(() => {
  // 여기서는 가짜 데이터 (실무에서는 API 요청)
  const dummyPosts = {
    101: { title: "Vue 시작하기", content: "Vue는 정말 쉬워요!" },
    202: { title: "Vue Router 배우기", content: "params는 유용해요!" },
  };
  post.value = dummyPosts[postId];
});
</script>

<template>
  <div>
    <h2>📝 게시글 상세</h2>
    <p v-if="post">제목: {{ post.title }}</p>
    <p v-if="post">내용: {{ post.content }}</p>
  </div>
</template>
