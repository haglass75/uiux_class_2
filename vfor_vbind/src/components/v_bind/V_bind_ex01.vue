<template>
  <div>
    <h2>🥕 v-bind 첫 연습</h2>
    <!-- v-bind란? HTML 속성에 변수(데이터)를 
     연결해주는 도구 이름 그대로 "묶는다(bind)" 라고 생각하면 돼! 
     줄여서 : -->
    <!-- v-bind:src = image -->
    <img :src="image" alt="과일" width="150" />

    <!-- 줄여쓰기 :src -->
    <img :src="image2" alt="야채" width="150" />
  </div>
</template>

<script setup>
import { ref } from "vue";

// 이미지 주소를 변수로 저장
const image = ref("https://picsum.photos/id/1020/200/150");
// const image = ref("https://via.placeholder.com/150/FF0000/FFFFFF?text=사과");
const image2 = ref("https://picsum.photos/id/1021/200/150");
</script>
