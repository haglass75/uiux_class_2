<template>
  <div>
    <h2>⌨️ 입력 이벤트</h2>
    <input @input="updateName" placeholder="이름을 입력하세요" />
    <p>내 이름은 {{ name }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const name = ref("");

const updateName = (event) => {
  name.value = event.target.value; // 입력한 값 가져오기
};
</script>
