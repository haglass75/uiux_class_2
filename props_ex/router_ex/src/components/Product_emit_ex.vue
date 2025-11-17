<template>
  <div class="card" @click="clickCard">
    <img :src="img" :alt="name" />
    <h3>{{ name }}</h3>
    <p>{{ price }}원</p>
  </div>
</template>

<script setup>
// 부모가 보내주는 데이터 받기
const props = defineProps(["img", "name", "price"]);

// 부모에게 이벤트 보내기
const emit = defineEmits(["selected"]);

const clickCard = () => {
  emit("selected", props.name); // 클릭하면 부모에게 상품 이름 전달
};
</script>

<style scoped>
.card {
  width: 180px;
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
