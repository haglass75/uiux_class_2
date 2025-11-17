<template>
  <div class="map-wrap">
    <h2>🗺️ 카카오 지도 연습하기</h2>

    <!-- 🔍 주소 검색 박스 -->
    <div class="search-box">
      <!-- 사용자가 주소를 입력할 입력창 -->
      <input v-model="keyword" placeholder="주소나 장소 입력" />
      <!-- 검색 버튼 -->
      <button @click="searchAddress">검색</button>
      <!-- 내 위치로 이동 버튼 -->
      <button @click="showMyLocation">📍내 위치</button>
    </div>

    <!-- 지도 보여줄 영역 -->
    <div id="map" style="width: 100%; height: 400px; border-radius: 10px"></div>
  </div>
</template>

<script setup>
// ✅ Vue에서 제공하는 기능 가져오기
import { ref, onMounted } from "vue";

// ref() : 데이터를 기억하는 상자 만들기
const map = ref(null); // 지도 정보를 담을 상자
const keyword = ref(""); // 사용자가 입력한 검색어를 담을 상자

let geocoder; // 주소를 실제 좌표로 바꾸는 도구 (나중에 넣을 거예요)

// ✅ onMounted() : 화면이 처음 켜질 때 실행되는 곳
onMounted(() => {
  // 카카오 지도 코드가 다 불러와진 뒤에 실행해야 해요
  window.kakao.maps.load(() => {
    // HTML에서 id가 'map'인 상자를 찾아요 (여기에 지도 그릴 거예요)
    const container = document.getElementById("map");

    // 지도 중심 위치(서울 시청 근처)와 확대 수준 설정
    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.978), // 중심 좌표
      level: 3, // 숫자가 작을수록 더 확대돼요
    };

    // 지도 만들기!
    map.value = new window.kakao.maps.Map(container, options);

    // 주소를 좌표로 바꾸는 "주소검색기" 준비
    //Geocoder() 카카오 지도에서 제공하는 “주소 검색 도구
    // 지오코딩(Geocoding)주소(글자)를 위도/경도(숫자 좌표)로 바꿔주는 도구
    // 우리가 입력하는 것	Geocoder가 바꿔주는 것
    // "서울시 중구 세종대로 110"	(위도: 37.5665, 경도: 126.9780)
    geocoder = new window.kakao.maps.services.Geocoder();

    // 기본으로 보여줄 마커들 (서울의 유명한 장소들)
    const locations = [
      { name: "서울 시청", lat: 37.5665, lng: 126.978 },
      { name: "남산타워", lat: 37.5512, lng: 126.9882 },
      { name: "경복궁", lat: 37.5796, lng: 126.977 },
    ];

    // 장소 목록을 하나씩 돌면서 지도에 마커 찍기
    locations.forEach((place) => {
      // 마커(핀) 만들기
      const marker = new window.kakao.maps.Marker({
        // 👉 “랏엘엔지(LatLng)” 라고 읽어요.
        // 영어로는 “Latitude and Longitude” (래티튜드 앤 롱기튜드)예요.

        // Lat (Latitude) = 위도 (북쪽↕️ 방향 위치)

        // Lng (Longitude) = 경도 (동쪽↔️ 방향 위치)
        position: new window.kakao.maps.LatLng(place.lat, place.lng), // 마커 위치
        map: map.value, // 어떤 지도에 표시할지
      });

      // 마우스를 올리면 보이는 말풍선(정보창)
      const info = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:5px;font-size:12px;">${place.name}</div>`,
      });

      // 마커에 마우스를 올리면 말풍선 열기
      window.kakao.maps.event.addListener(marker, "mouseover", () => {
        info.open(map.value, marker);
      });

      // 마커에서 마우스를 떼면 말풍선 닫기
      window.kakao.maps.event.addListener(marker, "mouseout", () => {
        info.close();
      });
    });
  });
});

// ✅ 주소 검색 함수
const searchAddress = () => {
  // 아무것도 안 쓰고 검색하면 안내 메시지 띄우기
  if (!keyword.value.trim()) {
    alert("주소나 장소를 입력하세요!");
    return;
  }

  // 주소를 좌표로 바꾸는 기능 사용
  geocoder.addressSearch(keyword.value, (result, status) => {
    // 검색이 성공했을 때
    if (status === window.kakao.maps.services.Status.OK) {
      // 좌표값 가져오기 (y는 위도, x는 경도)
      const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

      // 지도 중심을 그 좌표로 옮기기
      map.value.setCenter(coords);

      // 그 위치에 마커 찍기
      const marker = new window.kakao.maps.Marker({
        map: map.value,
        position: coords,
      });
    } else {
      alert("검색 결과가 없습니다 😢");
    }
  });
};

// ✅ 내 위치로 지도 옮기기
const showMyLocation = () => {
  // 컴퓨터나 폰이 내 위치를 알려줄 수 있는지 확인
  if (navigator.geolocation) {
    // 내 위치 불러오기
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude; // 내 위도
      const lng = pos.coords.longitude; // 내 경도
      const currentPos = new window.kakao.maps.LatLng(lat, lng);

      // 지도의 중심을 내 위치로 바꾸기
      map.value.setCenter(currentPos);

      // 내 위치에 마커 찍기
      new window.kakao.maps.Marker({
        position: currentPos,
        map: map.value,
      });
    });
  } else {
    alert("이 브라우저는 위치 정보를 지원하지 않습니다 🥲");
  }
};
</script>

<style scoped>
.map-wrap {
  max-width: 600px;
  margin: 30px auto;
  text-align: center;
  font-family: "Arial";
}

/* 검색창 스타일 */
.search-box {
  margin-bottom: 10px;
}

.search-box input {
  padding: 6px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.search-box button {
  margin-left: 5px;
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  background: #007bff;
  color: white;
  cursor: pointer;
}

.search-box button:hover {
  background: #0056b3;
}
</style>
