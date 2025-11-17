<!-- 자식 컴포넌트 MyCard.vue -->
<script setup>
const props = defineProps({
  name: String,
  age: Number
})
</script>

<template>
  <p>이름: {{ props.name }}</p>
  <p>나이: {{ props.age }}</p>
</template>