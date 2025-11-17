<template>
  <div class="list">
    <div
      v-for="item in products"
      :key="item.id"
      class="card"
      @click="clickItem(item.name)"
    >
      <img :src="item.img" />
      <h3>{{ item.name }}</h3>
      <p>{{ item.price }}원</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["products"]);
const emit = defineEmits(["selected"]);

const clickItem = (name) => {
  emit("selected", name);
};
</script>

<style scoped>
.list {
  display: flex;
  gap: 12px;
  margin-top: 10px;
}
.card {
  width: 130px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  transition: 0.3s;
}
.card:hover {
  background: #f0f0f0;
}
.card img {
  width: 100%;
  border-radius: 6px;
}
</style>
