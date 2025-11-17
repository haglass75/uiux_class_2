// main.js 파일 (프로젝트의 시작점)

// 'main.css' 불러오기
// 👉 우리가 만든 사이트에 필요한 디자인(색, 글자 크기, 위치 등)을 가져옴
import "./assets/main.css";

// Vue라는 도구에서 createApp(앱 만들기) 꺼내오기
// 👉 Vue는 "웹사이트 만드는 도구"예요
// 👉 createApp은 "Vue 사이트를 시작할 때 꼭 필요한 버튼" 같은 거예요
import { createApp } from "vue";

// App.vue 파일 불러오기
// 👉 App.vue는 우리 웹사이트의 "첫 화면(메인 화면)"이에요
import App from "./App.vue";

// createApp(App) → "App.vue를 가지고 새로운 앱을 만든다"
// .mount('#app') → "index.html 안에 있는 id가 app인 곳에 붙인다"
// 👉 즉, App.vue 내용이 index.html의 <div id="app"></div> 안에 들어가서 보여져요
createApp(App).mount("#app");
// main.css → 꾸미기(디자인) 가져오기

// createApp → Vue로 앱 만들 준비

// App.vue → 웹사이트 첫 화면

// mount('#app') → 그 화면을 index.html 안에 붙이기