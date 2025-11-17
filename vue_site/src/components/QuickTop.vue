<template>
  <button v-show="show" class="quick-top" @click="goTop" aria-label="맨 위로">
    ↑
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const show = ref(false);

// 스크롤을 체크해서 일정 높이 이상이면 버튼 보이기
const handleScroll = () => {
  show.value = window.scrollY > 200; // 200px 이상이면 보임
};

// 맨 위로 부드럽게 이동
const goTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
// 1) onMounted(...) :
//    - 이 부분은 Vue 컴포넌트의 '라이프사이클 훅'이에요.
//    - "컴포넌트가 화면에 처음 보여질(마운트될) 때" 안의 함수를 실행하겠다는 뜻이에요.
//    - 즉 페이지(또는 컴포넌트)가 준비된 후에 스크롤 감시를 시작하려는 거예요.
onMounted(() => window.addEventListener("scroll", handleScroll));
// onUnmounted(() => window.removeEventListener("scroll", handleScroll));
// **반드시** 컴포넌트가 사라질 때 리스너를 제거합니다.
onUnmounted(() => {
  // 1) onUnmounted(...) :
  //    - 이건 컴포넌트가 화면에서 사라질(언마운트될) 때 실행되는 함수예요.
  // 2) window.removeEventListener("scroll", handleScroll) :
  //    - 아까 등록한 이벤트를 똑같은 함수 참조로 제거하는 코드예요.
  //    - addEventListener 할 때와 같은 함수(handleScroll)를 전달해야 정확히 제거됩니다.
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.quick-top {
  position: fixed;
  right: 20px;
  bottom: 30px;
  width: 44px;
  height: 44px;
  border-radius: 8px;
  border: none;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
  background: #333;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, opacity 0.2s ease;
  opacity: 0.9;
}

/* v-show로 사라질 때 살짝 작아지게 */
/* .quick-top[style*="display: none"] {
  transform: scale(0.8);
  opacity: 0;
} */

/* 호버하면 살짝 커짐 */
.quick-top:hover {
  transform: translateY(-3px);
  opacity: 1;
}
</style>
