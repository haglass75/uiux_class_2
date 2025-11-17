<template>
  <section class="notice-gallery">
    <div class="notice">
      <h2>공지사항</h2>
      <ul>
        <li v-for="(notice, i) in notices" :key="i">{{ notice }}</li>
      </ul>
    </div>
    <div class="gallery">
      <h2>갤러리</h2>
      <div class="grid">
        <img v-for="(img, i) in gallery" :key="i" :src="img" alt="gallery" />
      </div>
    </div>
  </section>
</template>

<script setup>
const notices = [
  "9월 휴무 안내",
  "새로운 서비스 출시",
  "이벤트 참여 방법 안내",
];
const gallery = [
  "https://picsum.photos/id/1020/200/150",
  "https://picsum.photos/id/1021/200/150",
  "https://picsum.photos/id/1022/200/150",
];
</script>

<style scoped>
.notice-gallery {
  display: flex;
  gap: 20px;
  margin: 40px 0;
}
.notice,
.gallery {
  flex: 1;
}
.notice h2,
.gallery h2 {
  margin-bottom: 10px;
}
.notice ul {
  list-style: none;
  padding: 0;
}
.gallery .grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
}
.gallery img {
  width: 100%;
  display: block;
}
@media (max-width: 768px) {
  .notice-gallery {
    flex-direction: column;
  }
}
</style>
