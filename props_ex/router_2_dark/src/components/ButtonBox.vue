<template>
  <button class="btn" :style="{ backgroundColor: color }" @click="clickBtn">
    {{ label }}
  </button>
</template>

<script setup>
const props = defineProps(["label", "color"]);
const emit = defineEmits(["clicked"]);
const clickBtn = () => emit("clicked", props.label);
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as v;

.btn {
  @include v.btn;
}
</style>
