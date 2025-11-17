<template>
  <div>
    <h2>📝 아이디 입력 검사</h2>

    <!-- 아이디 입력창 -->
    <input v-model="userId" type="text" placeholder="아이디를 입력하세요" />

    <!-- 경고 문구 -->
    <p v-if="userId === ''" class="error">❌ 아이디를 꼭 입력해주세요!</p>
    <p v-else class="success">✅ 아이디 입력 완료</p>

    <button>회원가입</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 아이디 값
const userId = ref("");
</script>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}
.success {
  color: green;
  font-weight: bold;
}
</style>
