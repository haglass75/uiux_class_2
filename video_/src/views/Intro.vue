<template>
  <div class="intro">
    <video ref="introVideo" autoplay muted playsinline @ended="goToMain">
      <source src="/public/3958714-hd_1920_1080_30fps.mp4" type="video/mp4" />
      브라우저가 영상을 지원하지 않습니다.
    </video>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const introVideo = ref(null);

const goToMain = () => {
  router.push("/main"); // 메인 페이지로 이동
};

onMounted(() => {
  // 3초 후 강제로 메인 이동
  setTimeout(() => {
    goToMain();
  }, 3000);
});
</script>

<style scoped>
.intro {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: black;
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 영상 꽉 차게 */
}
</style>
