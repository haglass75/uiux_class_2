<template>
  <div class="address-container">
    <input v-model="address" placeholder="주소 입력" readonly />
    <button @click="searchAddress">주소검색</button>
    <div id="map" style="width: 100%; height: 400px; margin-top: 10px"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const address = ref("");
let map, marker;

// 📌 주소검색 버튼 클릭
const searchAddress = () => {
  new daum.Postcode({
    oncomplete: (data) => {
      address.value = data.address;

      // 🔹 여기서 카카오 SDK가 로드됐는지 확인하고 실행
      if (!window.kakao || !window.kakao.maps) {
        console.error("❌ 카카오 지도 SDK가 아직 안 불러와졌어요!");
        return;
      }

      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(data.address, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

            // 지도 생성
            map = new window.kakao.maps.Map(document.getElementById("map"), {
              center: coords,
              level: 3,
            });

            // 🔹 마커 이미지 적용
            const markerImageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png";
            const markerImageSize = new window.kakao.maps.Size(40, 40);
            const markerImage = new window.kakao.maps.MarkerImage(markerImageSrc, markerImageSize);

            marker = new window.kakao.maps.Marker({
              map: map,
              position: coords,
              image: markerImage,
            });

            map.setCenter(coords);
          }
        });
      });
    },
  }).open();
};

// 📌 페이지 로드 시 기본 지도 표시
onMounted(() => {
  if (!window.kakao || !window.kakao.maps) {
    console.warn("❌ 카카오 지도 SDK 아직 없음");
    return;
  }

  window.kakao.maps.load(() => {
    const defaultPos = new window.kakao.maps.LatLng(37.5665, 126.978); // 서울 중심
    map = new window.kakao.maps.Map(document.getElementById("map"), {
      center: defaultPos,
      level: 3,
    });
  });
});
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
