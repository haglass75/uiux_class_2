<!-- Parent.vue -->
<template>
  <Child :name="'경미'" :age="20" @clicked="sayHi" />
  <!-- <Child :name="'경미'" :age="20" 
  @clicked="showMessage" 
  @cancel="showMessage" 
  @submit="showMessage" /> -->
  <MyCard :name="'경미'" :age="25" />
</template>

<script setup>
import Child from "./Child.vue";
import MyCard from "./MyCard.vue";
const sayHi = (message) => {
  alert(message); // '안녕하세요!' 뜸
};
const showMessage = (message) => {
  alert(message);
};
</script>
