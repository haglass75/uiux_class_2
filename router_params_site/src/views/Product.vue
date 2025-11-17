<template>
  <div class="card">
    <h2>🛍 상품 상세 페이지</h2>
    <p>상품 번호: {{ id }}</p>
    <p>상품 이름: {{ productName }}</p>
    <p>상품 가격: {{ productPrice }} 원</p>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.id; // 주소에서 상품 번호 가져오기

// 간단한 가짜 데이터
// 1: , 2:
// 이건 상품 번호(열쇠, key) 역할을 해요.
// 1번은 첫 번째 상품(노트북),
// 2번은 두 번째 상품(헤드폰)을 뜻해요.
// 👉 순서(인덱스)는 자바스크립트가 자동으로 붙여줘요.
// 객체(Object) 는 내가 직접 열쇠(key) 를 붙이는 거예요.
const products = {
  1: { name: "노트북", price: 1500000 },
  2: { name: "헤드폰", price: 200000 },
};
console.log(products[1].name); // "노트북"
console.log(products[2].price); // 200000
// 배열 예제
const fruits = ["사과", "바나나"];
console.log(fruits[0]); // 사과 (자동으로 0번)

// 객체예제
const products1 = {
  apple: { price: 1000 },
  banana: { price: 2000 },
};
console.log(products1.apple.price); // 1000 (내가 apple 이라고 이름 붙임)
// ?. (옵셔널 체이닝)
// ?. 는 “혹시 없을 수도 있으니까 조심해!” 라는 안전벨트예요.?. = “그 자리에 과일 없으면 그냥 조용히 넘어가” 안전 장치
// 만약 products[id]가 없으면(undefined), 그냥 에러 ❌ 안 내고 undefined로 돌려줘요.
const productName = products[id]?.name;
const productPrice = products[id]?.price;
</script>
<style lang="scss" scoped>
@import "../assets/styles/card.scss";
</style>
