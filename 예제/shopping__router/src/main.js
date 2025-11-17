// // // src/main.js
// const kakaoMapKey = import.meta.env.VITE_KAKAO_MAP_KEY;

// // ✅ Kakao 지도 스크립트 직접 추가
// const script = document.createElement("script");
// script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&autoload=false&libraries=services`;
// document.head.appendChild(script);
import "./assets/base.css"
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

createApp(App).use(router).mount("#app");