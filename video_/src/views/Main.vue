<template>
  <div class="main">
    <header class="header">
      <h1>예약 사이트 🏨</h1>
      <nav>
        <a href="#">홈</a>
        <a href="#">예약하기</a>
        <a href="#">내 예약</a>
      </nav>
    </header>

    <main class="content">
      <h2>환영합니다 🎉</h2>
      <p>여행 · 호텔 · 렌터카 예약을 편리하게 한 곳에서!</p>
      <button @click="goReserve">예약하러 가기</button>
    </main>

    <footer class="footer">
      <p>© 2025 예약 사이트</p>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goReserve = () => {
  // 나중에 예약 페이지 라우트 연결 가능
  alert("예약 페이지로 이동합니다!");
  // router.push("/reserve");
};
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: "Arial", sans-serif;
}

.header {
  background: #4a90e2;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header nav a {
  margin-left: 1rem;
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.header nav a:hover {
  text-decoration: underline;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.content h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.content p {
  margin-bottom: 1.5rem;
  color: #555;
}

.content button {
  padding: 0.7rem 1.5rem;
  border: none;
  background: #4a90e2;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.content button:hover {
  background: #357ab7;
}

.footer {
  background: #f1f1f1;
  text-align: center;
  padding: 0.8rem;
  font-size: 0.9rem;
  color: #666;
}
</style>
