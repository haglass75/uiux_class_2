<template>
  <div class="address-container">
    <h2>📍 주소 검색 + 지도 표시</h2>

    <!-- 주소 입력 + 버튼 -->
    <div class="form">
      <input
        type="text"
        v-model="address"
        placeholder="주소를 검색하세요"
        readonly
      />
      <button @click="searchAddress">주소 검색</button>
    </div>

    <!-- 지도 -->
    <div id="map"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const address = ref(""); // 주소 저장
let map; // 지도
let marker; // 마커

// 🗺️ 지도 처음 표시
onMounted(() => {
  // 카카오 객체가 로드됐는지 확인
  if (!window.kakao || !window.kakao.maps) {
    console.error("❌ 카카오 지도 SDK가 아직 안 불러와졌어요!");
    return;
  }

  const container = document.getElementById("map");
  const options = {
    center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울 중심
    level: 3,
  };

  map = new window.kakao.maps.Map(container, options);
});

// 🔍 주소 검색 함수
function searchAddress() {
  new window.daum.Postcode({
    oncomplete: (data) => {
      // 선택된 주소 넣기
      address.value = data.address;

      // 주소 → 좌표로 바꾸기
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(data.address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

          // 지도 중심 이동
          map.setCenter(coords);

          // 마커 표시
          if (marker) marker.setMap(null);
          marker = new window.kakao.maps.Marker({
            map,
            position: coords,
          });
        }
      });
    },
  }).open();
}
</script>

<style scoped>
.address-container {
  width: 100%;
  max-width: 500px;
  margin: 50px auto;
  text-align: center;
  font-family: "Arial", sans-serif;
}

.form {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 15px;
}

input {
  width: 70%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

button {
  background: #ffcc00;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}

#map {
  width: 100%;
  height: 350px;
  border-radius: 12px;
  margin-top: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}
</style>
