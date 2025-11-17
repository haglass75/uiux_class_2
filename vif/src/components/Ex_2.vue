<script setup>
import { ref } from "vue";

// 선택한 나이를 저장하는 변수
// const age = ref(null);
const age = ref(0);
</script>

<template>
  <div>
    <h2>🎈 v-if 예제</h2>

    <!-- 나이 선택 -->
    <label for="age-select">나이를 선택하세요: </label>
    <select id="age-select" v-model="age">
      <option value="0" disabled>나이를 선택하세요---</option>
      <!-- <option value="null" disabled>나이를 선택하세요</option> -->
      <option value="5">5살</option>
      <option value="10">10살</option>
      <option value="15">15살</option>
      <option value="18">18살</option>
      <option value="20">20살</option>
      <option value="25">25살</option>
    </select>

    <!-- 조건에 따라 나이 표시 -->
    <p v-if="age >= 20">🍺 성인입니다</p>
    <p v-else-if="age >= 13">👦 청소년입니다</p>
    <p v-else>👶 어린이입니다</p>
  </div>
</template>

<style scoped></style>
