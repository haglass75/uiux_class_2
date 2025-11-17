<template>
  <button class="btn">{{ label }}</button>
</template>

<script setup>
defineProps({
  label: String,
});
</script>

<style lang="scss" scoped>
@import "../style/variables";

.btn {
  @include button-style($main-color);
}
</style>
