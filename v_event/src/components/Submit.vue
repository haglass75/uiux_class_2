<template>
  <div>
    <h2>📋 폼 이벤트</h2>
    <form @submit.prevent="handleSubmit">
      <input v-model="email" placeholder="이메일 입력" />
      <button type="submit">제출하기</button>
    </form>
    <p>입력된 이메일: {{ email }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");

const handleSubmit = () => {
  alert(`제출 완료! 입력한 이메일: ${email.value}`);
};
</script>
