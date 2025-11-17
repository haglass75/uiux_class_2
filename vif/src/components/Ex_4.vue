<template>
  <div>
    <h2>🖼 이미지 보이기 / 숨기기</h2>

    <!-- v-if -->
    <img v-if="showImage" src="https://picsum.photos/id/1025/200/150" alt="강아지" />

    <!-- 버튼 -->
    <button @click="showImage = !showImage">이미지 {{ showImage ? "숨기기" : "보이기" }}</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

// true = 이미지 보임, false = 안 보임
const showImage = ref(true);
</script>
