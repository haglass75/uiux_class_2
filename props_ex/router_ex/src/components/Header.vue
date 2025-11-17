<template>
  <header :class="{ dark: isDark }">
    <div class="inner">
      <img
        src="/public/images/link.png"
        alt="logo"
        class="logo"
        @click="goHome"
      />
      <div class="hamburger">
        <div
          class="line"
          v-for="n in 3"
          :key="n"
          :style="{ backgroundColor: lineColor }"
        ></div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
// 부모(App.vue)에서 전달받은 prop
const props = defineProps({
  isDark: Boolean,
  lineColor: {
    type: String,
    default: "#fff", // 기본색: 흰색
  },
});

// 홈으로 이동하는 함수
const goHome = () => {
  router.push("/"); // 무조건 "/" 경로로 이동
};
</script>

<style scoped lang="scss">
header {
  padding: 15px 20px;
  background: white;
  transition: 0.3s;

  &.dark {
    background: #222; // 어두운 배경
    .line {
      background: #fff; // 햄버거 하얗게
    }
    img {
      filter: brightness(0) invert(1); // 로고도 밝게
    }
  }

  .inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

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
}
</style>
