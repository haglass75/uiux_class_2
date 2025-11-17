<template>
  <div>
    <h2>🖼 상품 이미지</h2>
    <img :src="productImage" alt="상품" width="150" />
    <button @click="toggleImage">이미지 토글</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const images = ["https://picsum.photos/id/1020/200/150", "https://picsum.photos/id/1022/200/150"];

const productImage = ref(images[0]);

const toggleImage = () => {
  productImage.value = productImage.value === images[0] ? images[1] : images[0];
};
</script>
