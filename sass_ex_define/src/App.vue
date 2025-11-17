<template>
  <div class="app">
    <h2>🎨 Vue + Sass 연습</h2>

    <MyButton label="버튼 클릭" @click="showModal = true" />

    <MyCard title="카드 제목" content="카드 안의 내용입니다." />

    <MyModal :show="showModal" @close="showModal = false">
      <p>✨ 모달 내용 ✨</p>
    </MyModal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MyButton from "./components/MyButton.vue";
import MyCard from "./components/MyCard.vue";
import MyModal from "./components/MyModal.vue";

const showModal = ref(false);
</script>

<style scoped>
.app {
  text-align: center;
  padding: 20px;
}
</style>
