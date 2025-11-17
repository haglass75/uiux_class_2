<template>
  <div>
    <p>사탕 봉지 개수: {{ bags }}</p>
    <p>사탕 총 개수: {{ totalCandies }}</p>
    <button @click="bags++">봉지 추가하기</button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
//ref = 값 상자 🎁
// watch = 값 상자를 지켜보는 CCTV 📹
// computed = 값 상자를 이용한 자동 계산기 🧮 computed는 계산된 값을 만드는 친구예요.
// 직접 값을 바꾸는 게 아니라,
// 이미 있는 값(ref, reactive 등)을 자동으로 계산해서 새로운 값을 만들어요.

// 1) 사탕 봉지 개수 (ref로 만들기)
const bags = ref(1);

// 2) computed로 총 사탕 개수 계산하기
const totalCandies = computed(() => {
  return bags.value * 5;
});
</script>
