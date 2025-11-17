<template>
  <div>
    <h2>🔑 로그인</h2>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="이름 입력" />
      <input v-model="password" type="password" placeholder="비밀번호 입력" />
      <button type="submit">로그인</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");

const login = () => {
  const saved = localStorage.getItem("user");
  if (!saved) {
    alert("⚠️ 회원가입 먼저 해주세요!");
    return;
  }

  const user = JSON.parse(saved);

  if (username.value === user.username && password.value === user.password) {
    alert("✅ 로그인 성공!");
    // user → 회원 정보 저장용 (가입 시)

    // loggedInUser → 현재 로그인 상태 저장용 (로그인/로그아웃 제어)
    localStorage.setItem("loggedInUser", username.value); // 로그인 상태 저장
    // window.dispatchEvent(new Event("loginChange")); // 🔥 헤더에 알림
    router.push("/"); // 홈 페이지로 이동
  } else {
    alert("❌ 아이디 또는 비밀번호가 틀렸습니다.");
  }
};
</script>
