<template>
  <div>
    <router-link to="/">LOGO</router-link> |

    <router-link to="/reserve">예약하기</router-link> | <router-link to="/confirm">예약확인</router-link> |
    <router-link to="/review">리뷰</router-link> |
    <!-- 로그인 상태에 따라 메뉴 변경 -->
    <span v-if="loggedInUser">
      {{ loggedInUser }} 님 |
      <button @click="logout">로그아웃</button>
    </span>
    <span v-else>
      <router-link to="/login">로그인</router-link> |
      <router-link to="/signup">회원가입</router-link>
    </span>
    <button @click="toggleTheme" class="theme-btn">
      {{ isDark ? "🌙 다크 모드" : "☀️ 라이트 모드" }}
    </button>
  </div>
</template>

<script setup>
import {  ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const loggedInUser = ref(null);

// 로그인 상태 체크
const checkLogin = () => {
  const user = localStorage.getItem("loggedInUser");
  loggedInUser.value = user ? user : null;
};

// onMounted(() => {
//   checkLogin();
// });
// ✅ 컴포넌트가 열릴 때 한 번 실행
onMounted(() => {
  checkLogin();

  // ✅ 로그인 상태가 바뀌면 (다른 페이지에서 localStorage 변경되면) 바로 반영
  // window.addEventListener("storage", checkLogin);
});

// ✅ 컴포넌트가 사라질 때 이벤트 제거
// onUnmounted(() => {
//   window.removeEventListener("storage", checkLogin);
// });
// 로그아웃
const logout = () => {
  localStorage.removeItem("loggedInUser");
  loggedInUser.value = null;
  //  window.dispatchEvent(new Event("loginChange")); // 🔥 즉시 반응하게 알림 보내기
  alert("✅ 로그아웃되었습니다.");
  router.push("/login");
};

const THEME_KEY = 'my-theme' // localStorage에 저장할 키 이름
const isDark = ref(false)

// 페이지가 열릴 때 localStorage나 시스템 설정(prefers-color-scheme)을 확인해서 초기값 설정
onMounted(() => {
  const saved = localStorage.getItem(THEME_KEY)
  if (saved === 'dark') {
    isDark.value = true
  } else if (saved === 'light') {
    isDark.value = false
  } else {
    // 저장된 값이 없으면 시스템 설정을 참고 (선택사항)
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    isDark.value = prefersDark
  }
})

// isDark가 바뀔 때마다 html에 클래스 추가/제거하고 localStorage에 저장
watch(isDark, (val) => {
  const el = document.documentElement // <html> 태그
  if (val) {
    el.classList.add('dark')
    localStorage.setItem(THEME_KEY, 'dark')
  } else {
    el.classList.remove('dark')
    localStorage.setItem(THEME_KEY, 'light')
  }
}, { immediate: true }) // immediate: 처음 마운트될 때도 실행

function toggleTheme() {
  isDark.value = !isDark.value
}
</script>
<style scoped>
a{
  color: var(--text);
}
 
</style>