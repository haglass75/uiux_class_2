<template>
  <div>
    <h2>🍎 클릭 이벤트</h2>
    <p>{{ message }}</p>
    <button @click="sayHello">눌러봐!</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const message = ref("아직 안 눌렀어요");

const sayHello = () => {
  message.value = "안녕하세요 👋 버튼 눌렀어요!";
};
</script>
