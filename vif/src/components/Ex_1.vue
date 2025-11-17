<template>
  <div>
    <h2>🎈 v-if 예제</h2>

    <!-- 조건 -->
    <p v-if="isLogin">✅ 로그인 했어요!</p>
    <p v-else>❌ 아직 로그인 안 했어요.</p>

    <!-- 버튼으로 값 바꾸기 -->
    <button @click="isLogin = !isLogin">로그인/로그아웃</button>
  </div>
</template>
<script setup>
// v-if는 "조건에 따라 보였다 안 보였다" 하는 마법 같은 코드예요.
// 말 그대로 if(만약에 ~라면) 이라는 뜻.
import { ref } from "vue";

// true = 로그인 한 상태, false = 로그인 안 한 상태
const isLogin = ref(false);
// isLogin 이라는 불빛 스위치(ref 변수) 가 있어요.

// 처음엔 false → "로그인 안 했어요" 가 보여요.

// 버튼을 누르면 isLogin = !isLogin → 값이 반대로 바뀌어요.

// true → "로그인 했어요"

// false → "로그인 안 했어요"
</script>
<style scoped></style>
