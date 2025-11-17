<template>
  <div class="card" @click="clickCard">
    <img :src="img" :alt="name" />
    <h3>{{ name }}</h3>
    <p>{{ price }}원</p>
  </div>
</template>

<script setup>
const props = defineProps(["img", "name", "price"]);
const emit = defineEmits(["selected"]);

const clickCard = () => {
  emit("selected", props.name);
};
</script>

<style scoped>
.card {
  width: 150px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: 0.3s;
}
.card:hover {
  background: #f0f8ff;
}
.card img {
  width: 100%;
  border-radius: 6px;
}
</style>
