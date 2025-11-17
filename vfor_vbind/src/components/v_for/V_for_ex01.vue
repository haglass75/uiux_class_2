<template>
  <div>
    <h2>간단하게 반복</h2>
    <ul>
      <!-- fruits 배열을 하나씩 꺼내서 보여줌  
      v-for="변수 in 배열" 
      -->
      <li v-for="item in fruits" :key="item">{{ item }}</li>
    </ul>
    <h2>🛍 상품 목록</h2>
    <ul>
      <li v-for="(product, index) in products" :key="index">{{ index + 1 }}. {{ product }}</li>
    </ul>

    <h2>📝 글 목록</h2>
    <ul>
      <li v-for="(post, index) in posts" :key="index">{{ index + 1 }}. {{ post }}</li>
    </ul>

    <h2>📋 메뉴 목록</h2>
    <ul>
      <li v-for="(menu, index) in menus" :key="index">{{ index + 1 }}. {{ menu }}</li>
    </ul>
  </div>
</template>

<script setup>
// npm install -D unplugin-auto-import
// Vue에서 반복문(for문)처럼 쓰는 도구야.

// 배열이나 숫자를 돌면서 같은 모양의 태그를 여러 개 자동으로 만들어줘.
import { ref } from "vue";

const fruits = ref(["사과", "바나나", "포도", "딸기"]);
// 상품 배열
const products = ref(["피자", "햄버거", "콜라"]);

// 글 배열
const posts = ref(["첫 번째 글", "두 번째 글", "세 번째 글"]);

// 메뉴 배열
const menus = ref(["홈", "상품", "문의", "로그인"]);
</script>
<style scoped>
ul {
  margin-bottom: 15px;
}
li {
  font-size: 18px;
  margin: 3px 0;
}
</style>
