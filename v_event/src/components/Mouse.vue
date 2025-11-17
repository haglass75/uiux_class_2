<template>
  <div>
    <h2>🖱 마우스 이벤트</h2>
    <button @mouseover="color = 'lightgreen'" @mouseout="color = 'white'" :style="{ backgroundColor: color }">
      마우스 올려봐!
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const color = ref("white");
</script>
