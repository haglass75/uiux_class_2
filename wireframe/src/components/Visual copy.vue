<template>
  <section class="visual">
    <Swiper :loop="true" :autoplay="{ delay: 2500 }">
      <SwiperSlide v-for="(slide, i) in slides" :key="i">
        <img :src="slide.img" :alt="'slide' + i" />
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<script setup>
// npm install swiper
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

const slides = [
  { img: "https://picsum.photos/id/1011/1200/400" },
  { img: "https://picsum.photos/id/1012/1200/400" },
  { img: "https://picsum.photos/id/1013/1200/400" },
];
</script>

<style scoped>
.visual img {
  width: 100%;
  height: auto;
  display: block;
}
</style>
