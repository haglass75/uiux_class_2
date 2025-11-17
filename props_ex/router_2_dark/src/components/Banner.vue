<template>
  <div
    class="banner"
    :style="{ backgroundImage: `url(${bg})` }"
    @click="clickBanner"
  >
    {{ title }}
  </div>
</template>

<script setup>
const props = defineProps(["title", "bg"]);
const emit = defineEmits(["clicked"]);
const clickBanner = () => emit("clicked", props.title);
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as v;

.banner {
  @include v.banner-style;
  background-size: cover;
  background-position: center;
  color: var(--text-color);

  &:hover {
    color: var(--hover-text-color);
  }
}
</style>
