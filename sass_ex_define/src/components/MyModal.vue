<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <slot />
      <button class="close-btn" @click="$emit('close')">닫기</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
});
</script>

<style lang="scss" scoped>
@import "../style/variables";

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 12px;
    width: 300px;
    text-align: center;
  }

  .close-btn {
    margin-top: 12px;
    @include button-style($danger-color);
  }
}
</style>
