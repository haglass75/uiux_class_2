<script setup>
import Ex_1 from "./Ex_1.vue";
import Ex_2 from "./Ex_2.vue";
import Ex_3 from "./Ex_3.vue";
import Ex_4 from "./Ex_4.vue";
import Ex_5 from "./Ex_5.vue";
import Ex_6 from "./Ex_6.vue";
import Ex_7 from "./Ex_7.vue";
import Ex_8 from "./Ex_8.vue";
import Ex_9 from "./Ex_9.vue";
</script>

<template>
  <div class="contents">
    <Ex_1 />
    <Ex_2 />
    <Ex_3 />
    <Ex_4 />
    <Ex_5 />
    <Ex_6 />
    <Ex_7 />
    <Ex_8 />
    <Ex_9 />
  </div>
</template>

<style scoped>
.contents {
  /* display: flex;
  flex-wrap: wrap; */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
.contents div {
  background-color: antiquewhite;
  border-right: 1px solid #808080;
}
</style>
