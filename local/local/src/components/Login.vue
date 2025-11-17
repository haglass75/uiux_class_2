<template>
  <div class="login-box">
    <h2>👤 회원가입 / 로그인</h2>

    <!-- 회원가입 -->
    <div v-if="mode === 'signup'" class="form">
      <h3>회원가입</h3>
      <input v-model="signupEmail" placeholder="이메일" />
      <input v-model="signupPassword" type="password" placeholder="비밀번호" />
      <button @click="signup">✅ 가입하기</button>
      <p @click="mode = 'login'">👉 로그인하러 가기</p>
    </div>

    <!-- 로그인 -->
    <div v-else class="form">
      <h3>로그인</h3>
      <input v-model="loginEmail" placeholder="이메일" />
      <input v-model="loginPassword" type="password" placeholder="비밀번호" />
      <button @click="login">🔑 로그인</button>
      <p @click="mode = 'signup'">📝 회원가입하러 가기</p>
    </div>

    <hr />

    <!-- 로그인 성공 시 -->
    <div v-if="currentUser">
      <h3>🎉 환영합니다, {{ currentUser.email }}!</h3>
      <button @click="logout">🚪 로그아웃</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const mode = ref("signup"); // 'signup' or 'login'
const signupEmail = ref("");
const signupPassword = ref("");
const loginEmail = ref("");
const loginPassword = ref("");
const currentUser = ref(null); // 현재 로그인한 사용자

// 페이지 열릴 때 로그인 상태 유지
onMounted(() => {
  const savedUser = localStorage.getItem("currentUser");
  if (savedUser) {
    currentUser.value = JSON.parse(savedUser);
  }
});

// 회원가입
const signup = () => {
  if (!signupEmail.value || !signupPassword.value) {
    alert("이메일과 비밀번호를 입력하세요!");
    return;
  }

  // 기존 사용자 불러오기
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  // 중복 이메일 체크
  const exist = users.find((u) => u.email === signupEmail.value);
  if (exist) {
    alert("이미 가입된 이메일이에요!");
    return;
  }

  // 새 사용자 추가
  const newUser = {
    email: signupEmail.value,
    password: signupPassword.value,
  };
  users.push(newUser);

  // localStorage 저장
  localStorage.setItem("users", JSON.stringify(users));
  alert("회원가입 완료! 로그인해주세요.");
  signupEmail.value = "";
  signupPassword.value = "";
  mode.value = "login";
};

// 로그인
const login = () => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const user = users.find((u) => u.email === loginEmail.value && u.password === loginPassword.value);

  if (user) {
    alert("로그인 성공!");
    currentUser.value = user;
    localStorage.setItem("currentUser", JSON.stringify(user));
    loginEmail.value = "";
    loginPassword.value = "";
  } else {
    alert("이메일 또는 비밀번호가 틀렸어요!");
  }
};

// 로그아웃
const logout = () => {
  localStorage.removeItem("currentUser");
  currentUser.value = null;
  alert("로그아웃 되었어요!");
};
</script>

<style scoped>
.login-box {
  width: 330px;
  margin: 40px auto;
  padding: 20px;
  background: #f5f7ff;
  border-radius: 12px;
  text-align: center;
}
input {
  width: 100%;
  margin-bottom: 8px;
  padding: 6px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
button {
  width: 100%;
  background: #0a66c2;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
}
button:hover {
  background: #004a99;
}
p {
  color: #0a66c2;
  cursor: pointer;
  font-size: 14px;
}
p:hover {
  text-decoration: underline;
}
</style>
