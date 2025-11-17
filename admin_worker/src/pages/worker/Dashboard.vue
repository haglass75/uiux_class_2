<template>
  <div
    class="h-screen max-w-[480px] fixed top-0 left-1/2 -translate-x-1/2 overflow-hidden">
    <!-- 헤더 고정 -->
    <header
      ref="headerRef"
      class="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-20 bg-white border-b border-gray-200">
      <div class="flex items-center gap-3 justify-between p-4">
        <div
          class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
          기
        </div>
        <div>
          <p class="text-sm text-gray-500">안녕하세요, 기사님</p>
          <h1 class="text-lg font-semibold">오늘도 안전하고 깔끔하게!</h1>
          <div class="text-sm text-gray-500">{{ todayText }}</div>
        </div>
        <Weather />
      </div>
    </header>
    <!-- 메인 내용 스크롤 -->
    <main
      class="overflow-y-auto px-8 max-h-[calc(100vh-68px)]"
      :style="{
        paddingTop: `calc(${headerHeight}px + 2rem)`,
        paddingBottom: `calc(68px + env(safe-area-inset-bottom) + 2rem)`,
      }">
      <router-view></router-view>
    </main>
    <!-- 하단 탭바 -->
    <nav
      class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white/95 backdrop-blur border-t border-gray-200 h-[68px] z-10"
      style="padding-bottom: env(safe-area-inset-bottom)">
      <div class="h-full grid grid-cols-3">
        <router-link
          :to="{ name: 'MobileJobs' }"
          class="relative flex flex-col items-center justify-center text-xs"
          :class="
            $route.name === 'MobileJobs' ? 'text-blue-600' : 'text-gray-500'
          ">
          <span
            class="w-7 h-7 rounded-xl bg-blue-50 flex items-center justify-center shadow-inner"
            >📋</span
          >
          작업목록
          <span
            v-if="$route.name === 'MobileJobs'"
            class="absolute -top-1 w-12 h-1 rounded-full bg-blue-600/80"></span>
        </router-link>
        <router-link
          :to="{ name: 'MobileCalendar' }"
          class="relative flex flex-col items-center justify-center text-xs"
          :class="
            $route.name === 'MobileCalendar' ? 'text-blue-600' : 'text-gray-500'
          ">
          <span
            class="w-7 h-7 rounded-xl bg-blue-50 flex items-center justify-center shadow-inner"
            >🗓️</span
          >
          캘린더
          <span
            v-if="$route.name === 'MobileCalendar'"
            class="absolute -top-1 w-12 h-1 rounded-full bg-blue-600/80"></span>
        </router-link>
        <router-link
          :to="{ name: 'MobilePayment' }"
          class="relative flex flex-col items-center justify-center text-xs"
          :class="
            $route.name === 'MobilePayment' ? 'text-green-600' : 'text-gray-500'
          ">
          <span
            class="w-7 h-7 rounded-xl bg-green-50 flex items-center justify-center shadow-inner"
            >💰</span
          >
          정산내역
          <span
            v-if="$route.name === 'MobilePayment'"
            class="absolute -top-1 w-12 h-1 rounded-full bg-green-600/80"></span>
        </router-link>
      </div>
    </nav>
  </div>
</template>
<script setup>
import { RouterView } from "vue-router";
import Weather from "@/components/Weather.vue";
import { ref, onMounted } from "vue";

const headerRef = ref(null);
const headerHeight = ref(100);

onMounted(() => {
  if (headerRef.value) {
    headerHeight.value = headerRef.value.offsetHeight;
  }
});

const todayText = new Date().toLocaleDateString("ko-KR", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});
</script>

<style scoped>
/* .no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
} */

</style>
