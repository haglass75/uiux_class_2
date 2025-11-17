<template>
  <header :class="[{ dark: isDark }, { scrolled: isScrolled }]">
    <div class="inner">
      <!-- <img :src="logoSrc" alt="logo" class="logo" @click="goHome" /> -->
      <img src="/public/images/link.png" alt="logo" class="logo" @click="goHome" />
      <div class="hamburger">
        <div class="line" v-for="n in 3" :key="n" :style="{ backgroundColor: lineColor }"></div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 부모(App.vue)에서 받은 값
const props = defineProps({
  isDark: Boolean,
  lineColor: {
    type: String,
    default: "#fff",
  },
  // logoSrc: {
  //   type: String,
  //   default: "/images/link.png", // 기본 이미지
  // },
});

// 홈으로 이동
const goHome = () => {
  router.push("/");
};

// 🌟 스크롤 상태 저장
const isScrolled = ref(false);

// 🌟 스크롤하면 색 변경
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50; // 50px 이상 스크롤하면 true
};

// 🌟 페이지 켜질 때 감시 시작
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

// 🌟 페이지 닫힐 때 감시 끝
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped lang="scss">
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 15px 20px;
  background: transparent; /* 처음엔 투명 */
  transition: 0.3s;
  z-index: 10;
  .hamburger {
    .line {
      width: 25px;
      height: 3px;
      background: #333;
      margin: 4px 0;
      border-radius: 2px;
      transition: 0.3s;
    }
  }
  &.dark {
    background: #222; /* 어두운 페이지용 */
    .line {
      background: #fff;
    }
    img {
      filter: brightness(0) invert(1);
    }
  }

  /* 🌟 스크롤하면 흰 배경으로 바뀜 */
  &.scrolled {
    background: rgb(0, 0, 0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    .line {
      background: #ffffff !important;
    }
    img {
      filter: brightness(0) invert(1);
    }
  }

  .inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
