<template>
  <div>
    <h2>🔐 로그인 메뉴</h2>

    <!-- 로그인 안 했을 때 -->
    <div v-if="!isLogin">
      <button @click="login">로그인</button>
      <button>회원가입</button>
    </div>

    <!-- 로그인 했을 때 -->
    <div v-else>
      <p>😊 {{ userName }}님 환영합니다!</p>
      <button @click="logout">로그아웃</button>
      <button>마이페이지</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 로그인 상태 (false = 안 함, true = 함)
const isLogin = ref(false);

// 사용자 이름
const userName = ref("홍길동");

// 로그인 함수
const login = () => {
  isLogin.value = true;
};

// 로그아웃 함수
const logout = () => {
  isLogin.value = false;
};
</script>
