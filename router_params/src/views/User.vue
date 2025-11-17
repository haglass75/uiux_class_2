<template>
  <div>
    <h2>👤 유저 프로필</h2>
    <p>유저 이름: {{ route.params.username }}</p>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

</script>
