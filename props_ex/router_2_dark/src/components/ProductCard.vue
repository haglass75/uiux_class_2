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
const clickCard = () => emit("selected", props.name);
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as v;

.card {
  @include v.card;
  background-color: var(--bg-color);
  color: var(--text-color);

  img {
    width: 100%;
    border-radius: 6px;
  }

  &:hover {
    background: #f0f8ff33;
    color: var(--hover-text-color); // 다크모드일 때 글자 검정
  }
}
</style>
