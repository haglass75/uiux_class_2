<template>
  <div>

    <!-- <button @click="onClick">눌러보기</button> -->
    <button @click="emit('clicked', '안녕하세요!')">클릭</button>
    <button @click="emit('cancel','진짜 취소?')">취소</button>
    <button @click="emit('submit','진짜 제출?')">제출</button>
  </div>
</template>

<script setup>

const emit = defineEmits(["clicked", "cancel", "submit"]);

</script>
