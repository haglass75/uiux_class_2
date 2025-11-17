<!-- <template>
  <div>
    <h2>⭐ 숫자 반복 예제</h2>
    <span v-for="n in 5" :key="n">⭐</span>
  </div>
</template>

<script setup>
// 별 5개 찍을 때는 단순히 숫자 in N 형태로 가능
</script> -->
<template>
  <div class="stars">
    <h3>⭐ 별 반쪽 예제</h3>
    <!-- 꽉 찬 별 4개 -->
    <span v-for="n in 4" :key="n" class="star full">★</span>
    <!-- 반쪽 별 -->
    <span class="star half">★</span>
    <!-- 빈 별 -->
    <!-- <span class="star empty">★</span> -->
  </div>
</template>

<script setup></script>

<style scoped>
h3 {
  font-size: 18px;
  color: #333;
}
.stars {
  font-size: 2rem;
  color: lightgray; /* 기본은 빈 별 색 */
}

/* 꽉 찬 별 */
.star.full {
  color: gold;
}

/* 빈 별 */
.star.empty {
  color: lightgray;
}

/* 반쪽 별 */
.star.half {
  position: relative;
  display: inline-block;
  color: lightgray; /* 먼저 회색 별 찍고 */
}
.star.half::before {
  content: "★"; /* 위에 별 하나 더 */
  position: absolute;
  left: 0;
  width: 50%; /* 절반만 칠하기 */
  overflow: hidden;
  color: gold;
}
</style>
