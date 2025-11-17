<template>
  <div>
    <!-- 헤더 -->
    <Header
      :isDark="isDarkHeader"
      :lineColor="lineColor"
      :class="{ scrolled: isScrolled }"
      :logoSrc="isDarkHeader ? '/images/link.png' : '/images/favicon_192.png'" />

    <!-- 페이지 내용 -->
    <router-view />
    <QuickTop />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import Header from "@/components/Header.vue";
import QuickTop from "@/components/QuickTop.vue";

// 1️⃣ 현재 페이지 정보 가져오기
const route = useRoute();

// 2️⃣ 특정 페이지에서는 헤더를 어둡게!
const isDarkHeader = computed(() => ["Reserve", "DarkMode"].includes(route.name));

// 3️⃣ 스크롤 상태 저장 (처음엔 false)
const isScrolled = ref(false);

// 4️⃣ 스크롤하면 색 바꾸기
const handleScroll = () => {
  // 스크롤이 50px 넘으면 true
  isScrolled.value = window.scrollY > 50;
};

// 5️⃣ 페이지가 켜질 때 스크롤 감시 시작!
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
// 1) onMounted(...) :
//    - 이 부분은 Vue 컴포넌트의 '라이프사이클 훅'이에요.
//    - "컴포넌트가 화면에 처음 보여질(마운트될) 때" 안의 함수를 실행하겠다는 뜻이에요.
//    - 즉 페이지(또는 컴포넌트)가 준비된 후에 스크롤 감시를 시작하려는 거예요.
// 6️⃣ 페이지가 꺼질 때 감시 멈추기!
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// 7️⃣ 페이지 이름에 따라 선(line) 색 다르게

const lineColor = computed(() => (["Reserve", "DarkMode"].includes(route.name) ? "#fff" : "#333"));
</script>
<style lang="scss" scoped>
.view {
  padding-top: 80px;
}
</style>
