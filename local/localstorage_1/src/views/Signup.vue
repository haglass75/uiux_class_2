<template>
  <div>
    <h2>👤 회원가입</h2>
    <form @submit.prevent="signup">
      <input v-model="username" placeholder="이름 입력" />
      <input v-model="password" type="password" placeholder="비밀번호 입력" />
      <button type="submit">회원가입</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");

const signup = () => {
  const user = { username: username.value, password: password.value };

  localStorage.setItem("user", JSON.stringify(user)); // 회원 정보 저장
  alert("✅ 회원가입 완료!");
  router.push("/login"); // 로그인 페이지로 이동
};
</script>
