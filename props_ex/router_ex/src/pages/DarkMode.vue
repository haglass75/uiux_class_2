<template>
  <div class="review-page" :class="{ dark: isDark }">
    <!-- 헤더 -->
    <header class="header">
      <h1>📝 고객 리뷰</h1>
      <button @click="toggleTheme">
        {{ isDark ? "☀️ 라이트모드" : "🌙 다크모드" }}
      </button>
    </header>

    <!-- 리뷰 카드 목록 -->
    <div class="reviews">
      <div class="review-card" v-for="(r, i) in reviews" :key="i">
        <h3>{{ r.user }}</h3>
        <p>{{ r.comment }}</p>
        <span>⭐ {{ r.rating }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isDark = ref(false);
const toggleTheme = () => (isDark.value = !isDark.value);

const reviews = [
  { user: "민지", comment: "서비스가 정말 좋아요!", rating: 5 },
  { user: "현우", comment: "배송도 빠르고 친절했습니다 😊", rating: 4 },
  { user: "수연", comment: "깔끔하고 만족스러워요!", rating: 5 },
];
</script>

<style scoped lang="scss">
// 기본 (라이트 모드)
.review-page {
  background-color: #f9f9f9;
  color: #222;
  min-height: 100vh;
  padding: 40px;
  transition: 0.3s ease;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;

    button {
      background: #ddd;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        background: #ccc;
      }
    }
  }

  .reviews {
    display: grid;
    gap: 20px;

    .review-card {
      background: #fff;
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      transition: 0.3s;

      h3 {
        margin-bottom: 10px;
      }

      span {
        display: inline-block;
        margin-top: 10px;
        font-weight: bold;
      }
    }
  }

  // 🌙 다크모드
  &.dark {
    background-color: #121212;
    color: #f9f9f9;

    .header button {
      background: #333;
      color: #fff;
      &:hover {
        background: #555;
      }
    }

    .review-card {
      background: #1e1e1e;
      box-shadow: 0 4px 10px rgba(255, 255, 255, 0.1);
    }
  }
}
</style>
