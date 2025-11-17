<template>
  <div>
    <div class="event">
      <Click />
      <hr />
      <Input_change />
      <hr />
      <Submit />
      <hr />
      <Mouse />
    </div>
    <Form_ex />
  </div>
</template>
<script setup>
import Click from "./components/Click.vue";
import Form_ex from "./components/Form_ex.vue";
import Input_change from "./components/Input_change.vue";
import Mouse from "./components/Mouse.vue";
import Submit from "./components/Submit.vue";
</script>

<style scoped>
.event {
  display: flex;
}
.event div {
  flex: 1;
  padding: 10px;
  background-color: beige;
}
</style>
