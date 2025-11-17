<template>
  <div>
    <h2>🍕 버튼 색상 바꾸기</h2>
    <!-- v-bind:style -->
    <button :style="{ backgroundColor: btnColor, color: 'white', padding: '10px' }" @click="changeColor">
      {{ btnText }}
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 버튼 변수
const btnColor = ref("blue");
const btnText = ref("클릭하세요");

// 버튼 클릭 시 색 바꾸는 함수
const changeColor = () => {
  // 색상 랜덤으로 바꾸기
  const colors = ["red", "green", "orange", "purple", "pink"];
  btnColor.value = colors[Math.floor(Math.random() * colors.length)];
};
</script>

<style scoped></style>
