<template>
  <div>
    <h2>🔗 동적 링크</h2>
    <a :href="linkUrl" target="_blank">사이트 이동</a>
    <button @click="changeLink">다른 사이트</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const linkUrl = ref("https://www.naver.com");

const changeLink = () => {
  linkUrl.value = "https://www.daum.net";
};
</script>
