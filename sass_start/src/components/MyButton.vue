<template>
  <button class="btn">{{ label }}</button>
</template>

<script setup>
defineProps({
  label: String
})
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables";
@import "@/assets/styles/mixins";

.btn {
  @include button-style($main-color);
}
</style>
