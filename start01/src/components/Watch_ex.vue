<template>
  <div>
    <p>현재 점수: {{ score }}</p>
    <button @click="score++">점수 올리기</button>
    <button @click="score--">점수 내리기</button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

// 1) 감시할 값 (점수)
const score = ref(0);

// 2) watch()로 지켜보기
watch(score, (newValue, oldValue) => {
  console.log("점수가 바뀌었어요!");
  console.log("이전 점수:", oldValue, "→ 새 점수:", newValue);

  if (newValue >= 10) {
    alert("우와! 점수가 10점 이상이에요 🎉");
  }
});
// 어떻게 동작할까?watch()는 “지켜보다” 라는 뜻이에요.
// 즉, 변수가 바뀌는 걸 지켜보다가
// “어! 값이 바뀌었네?” 하면 특별한 행동을 하는 함수예요.
// score 값이 바뀌기 전에는 아무 일도 안 해요.
// score 값이 0 → 1, 1 → 2 … 이렇게 변하면 watch()가 바로 알아채요.
// “바뀌었다!” 하고 콜백 함수를 실행해요.
// 이전 값(oldValue)과 새로운 값(newValue)을 알려줘요.
// 5. 쉽게 요약
// ref() = 값을 담는 상자
// watch() = 그 상자를 지켜보는 CCTV
// 값이 달라지면 → 알람 울리고 → 정해둔 행동 실행
</script>
