<template>
  <button class="btn" :style="{ backgroundColor: color }" @click="clickBtn">
    {{ label }}
  </button>
</template>

<script setup>
const props = defineProps(["label", "color"]);
const emit = defineEmits(["clicked"]);

const clickBtn = () => {
  emit("clicked", props.label);
};
</script>

<style scoped>
.btn {
  color: #fff;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  margin: 4px;
  transition: 0.3s;
}
.btn:hover {
  opacity: 0.8;
}
</style>
