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
const clickItem = (name) => emit("selected", name);
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as v;

.list {
  display: flex;
  gap: 12px;
  margin-top: 10px;

  .card {
    @include v.card;
    width: 130px;
    background-color: var(--bg-color);
    color: var(--text-color);

    img {
      width: 100%;
      border-radius: 6px;
    }

    &:hover {
      background: #f0f0f0;
      color: var(--hover-text-color);
    }
  }
}
</style>
