<template>
  <div class="wrap">
    <Header />
    <main>
      <div class="inner">
        <Visual />
        <NoticeGallery />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Visual from "./components/Visual.vue";
import NoticeGallery from "./components/NoticeGallery.vue";
import Footer from "./components/Footer.vue";
</script>

<style>
.wrap {
  font-family: "Arial", sans-serif;

  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.inner {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
