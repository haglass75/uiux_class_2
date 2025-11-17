<template>
  <div class="address-container">
    <input v-model="address" placeholder="주소 입력" readonly />
    <button @click="searchAddress">주소검색</button>
    <div id="map" style="width: 100%; height: 400px; margin-top: 10px"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
// ✅ 주소를 저장할 변수 (입력한 주소를 기억해둠)
const address = ref("");

// ✅ 지도와 마커(핀)을 담을 변수
let map, marker;

// -----------------------------------------------------
// 📌 주소검색 버튼을 눌렀을 때 실행되는 함수
// -----------------------------------------------------
const searchAddress = () => {
  // 🟢 다음(카카오)에서 제공하는 주소 검색창 띄우기
  new daum.Postcode({
    // 사용자가 주소를 선택했을 때 실행되는 부분
    oncomplete: (data) => {
      // 사용자가 고른 주소를 화면에 표시하기 위해 변수에 저장
      address.value = data.address;

      // 🧱 혹시 카카오 지도 기능이 아직 안 불러와졌다면 에러 출력
      if (!window.kakao || !window.kakao.maps) {
        console.error("❌ 카카오 지도 SDK가 아직 안 불러와졌어요!");
        return; // 더 이상 아래 코드 실행 안 함
      }

      // 🗺️ 카카오 지도 기능이 준비되면 실행
      window.kakao.maps.load(() => {
        // 주소 → 좌표(위도, 경도)로 바꿔주는 도구 불러오기
        const geocoder = new window.kakao.maps.services.Geocoder();

        // 사용자가 선택한 주소를 좌표로 변환하기
        geocoder.addressSearch(data.address, (result, status) => {
          // 변환이 성공했을 때만 실행
          if (status === window.kakao.maps.services.Status.OK) {
            // 변환된 결과에서 위도(y), 경도(x) 꺼내서 지도 좌표로 만들기
            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

            // ✅ 지도 만들기
            map = new window.kakao.maps.Map(document.getElementById("map"), {
              center: coords, // 지도의 중심 위치를 검색한 주소로 설정
              level: 3, // 지도의 확대 정도 (숫자가 작을수록 더 가까이)
            });

            // ✅ 마커(핀) 이미지 설정하기
            const markerImageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png"; // 마커 이미지 주소
            const markerImageSize = new window.kakao.maps.Size(40, 40); // 이미지 크기
            const markerImage = new window.kakao.maps.MarkerImage(markerImageSrc, markerImageSize); // 이미지로 마커 생성

            // ✅ 지도 위에 마커(핀) 올리기
            marker = new window.kakao.maps.Marker({
              map: map, // 마커를 표시할 지도
              position: coords, // 마커가 표시될 위치 (검색한 주소의 좌표)
              image: markerImage, // 위에서 만든 마커 이미지 적용
            });

            // ✅ 지도 중심을 마커가 있는 곳으로 이동
            map.setCenter(coords);
          }
        });
      });
    },
  }).open(); // 🟢 주소 검색창 열기!
};

// -----------------------------------------------------
// 📌 페이지가 처음 열릴 때 실행되는 부분
// -----------------------------------------------------
onMounted(() => {
  // 🧱 혹시 카카오 지도 기능이 아직 안 불러와졌으면 경고 표시
  if (!window.kakao || !window.kakao.maps) {
    console.warn("❌ 카카오 지도 SDK 아직 없음");
    return;
  }

  // 🗺️ 카카오 지도 기능이 준비되면 실행
  window.kakao.maps.load(() => {
    // ✅ 기본 위치 설정 (서울 중심)
    const defaultPos = new window.kakao.maps.LatLng(37.5665, 126.978);

    // ✅ 기본 지도 표시
    map = new window.kakao.maps.Map(document.getElementById("map"), {
      center: defaultPos, // 중심 좌표
      level: 3, // 확대 정도
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
