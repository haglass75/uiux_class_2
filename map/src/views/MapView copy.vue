<template>
  <div class="map-wrap">
    <h2>🗺️ 카카오 지도 불러오기</h2>
    <!-- 지도가 들어갈 박스 -->
    <div id="map" style="width: 100%; height: 400px; border-radius: 10px;"></div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  // ✅ 카카오 지도 SDK가 로드된 후 실행
  window.kakao.maps.load(() => {
    const container = document.getElementById("map"); // 지도 들어갈 div
    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울 좌표
      level: 3, // 확대 레벨 (숫자 작을수록 확대)
    };
    const map = new window.kakao.maps.Map(container, options); // 지도 생성

    // ✅ 마커 표시하기
    const marker = new window.kakao.maps.Marker({
      position: options.center,
    });
    marker.setMap(map);
  });
});
</script>

<style scoped>
.map-wrap {
  max-width: 500px;
  margin: 30px auto;
  text-align: center;
  font-family: "Arial";
}
</style>
