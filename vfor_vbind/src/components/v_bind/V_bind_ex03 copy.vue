<template>
  <div>
    <h2>🖼 상품 이미지</h2>
    <img :src="productImage" alt="상품" width="150" />
    <button @click="changeImage">이미지 바꾸기</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const productImage = ref("https://picsum.photos/id/1020/200/150");

const changeImage = () => {
  productImage.value = "https://picsum.photos/id/1022/200/150";
};
</script>
