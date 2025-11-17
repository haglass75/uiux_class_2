<template>
  <section class="visual">
    <Swiper
      class="mySwiper"
      :modules="[Autoplay, Pagination, Navigation]"
      :autoplay="{ delay: 2500, disableOnInteraction: false }"
      :loop="true"
      :pagination="{ clickable: true }"
      :navigation="true">
      <SwiperSlide
        ><img src="https://picsum.photos/id/1011/1200/400" alt=""
      /></SwiperSlide>
      <SwiperSlide
        ><img src="https://picsum.photos/id/1012/1200/400" alt=""
      /></SwiperSlide>
      <SwiperSlide
        ><img src="https://picsum.photos/id/1013/1200/400" alt=""
      /></SwiperSlide>
    </Swiper>
  </section>
</template>

<script setup>
// npm install swiper
import { Swiper, SwiperSlide } from "swiper/vue";
// Swiper CSS
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// Swiper 모듈
import { Autoplay, Pagination, Navigation } from "swiper/modules";
</script>

<style scoped>
.visual img {
  width: 100%;
  height: auto;
  display: block;
}

</style>
