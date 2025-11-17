<template>
  <div
    class="banner"
    :style="{ backgroundImage: `url(${bg})` }"
    @click="clickBanner"
  >
    <h2>{{ title }}</h2>
  </div>
</template>

<script setup>
const props = defineProps(["title", "bg"]);
const emit = defineEmits(["clicked"]);

const clickBanner = () => {
  emit("clicked", props.title);
};
</script>

<style scoped>
.banner {
  height: 150px;
  background-size: cover;
  background-position: center;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  border-radius: 12px;
  margin: 10px 0;
  cursor: pointer;
}
</style>
