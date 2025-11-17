<template>
  <div >
    <!-- 헤더 -->
    <Header :isDark="isDarkHeader" :lineColor="lineColor" />
    <!-- 페이지 내용 -->
    <router-view />
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import Header from "@/components/Header.vue";

// 현재 경로 가져오기
const route = useRoute();

// 페이지마다 헤더 색 다르게
// const isDarkHeader = computed(() => route.name === "Reserve"  );
const isDarkHeader = computed(() =>
  ["Reserve", "DarkMode"].includes(route.name)
);


// theme 값이 바뀔 때 CSS 변수 색상 변경


// 💡 defineProps()는 부모 → 자식으로 데이터를 보낼 때만 사용!
// App.vue는 부모이기 때문에 defineProps() 필요 ❌
const lineColor = computed(() => (route.name === "Reserve" ? "#fff" : "#333"));
</script>
