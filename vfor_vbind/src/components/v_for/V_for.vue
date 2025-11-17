<template>
  <div class="content">
    <V_for_ex01 />
    <hr />
    <V_for_ex02 />
    <hr />
    <V_for_ex03 />
    <hr />
    <V_for_ex04 />
  </div>
</template>

<script setup>
import V_for_ex01 from "./V_for_ex01.vue";
import V_for_ex02 from "./V_for_ex02.vue";
import V_for_ex03 from "./V_for_ex03.vue";
import V_for_ex04 from "./V_for_ex04.vue";
</script>
<style scoped>
.content {
  display: flex;
}
.content div {
  flex: 1;
}
</style>
