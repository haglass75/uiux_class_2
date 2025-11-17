<script setup>
import Ex_01 from "./components/Ex_01.vue";
import Ex_02 from "./components/Ex_02.vue";
import Jim from "./components/Jim.vue";
import Bing from "./components/Bing.vue";
import Tab_Jim_Bing from "./components/Tab_Jim_Bing.vue";
import Last_reser from "./components/Last_reser.vue";
import Tab_menu_ex from "./components/Tab_menu_ex.vue";
</script>

<template>
  <div class="tab">
    <Tab_menu_ex />
  </div>
  <div class="container">
    <Ex_01 />

    <Ex_02 />
  </div>
  <div class="container">
    <Jim />
    <Bing />
  </div>
  <div class="container">
    <Tab_Jim_Bing />
    <Last_reser />
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}
.container div {
  background-color: rgb(211, 228, 243);
}
.tab{
  height: 600px;
}
</style>
