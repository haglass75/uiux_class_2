<template>
  <div class="content">
    <V_bind_ex01 />
    <V_bind_ex02 />
    <V_bind_ex03 />
    <V_bind_ex04 />
  </div>
</template>

<script setup>
import V_bind_ex01 from "./V_bind_ex01.vue";
import V_bind_ex02 from "./V_bind_ex02.vue";
import V_bind_ex03 from "./V_bind_ex03.vue";
import V_bind_ex04 from "./V_bind_ex04.vue";
</script>
<style scoped>
.content {
  display: flex;
}
.content div {
  flex: 1;
}
</style>
