<template>
  <main class="home">
    <h1>🏠 홈 페이지</h1>
    <router-link to="/reserve" class="btn">예약하러 가기</router-link>
    <router-link to="/review" class="btn">리뷰보러 가기</router-link>
  </main>
</template>

<script setup>
import { ref } from "vue";
// import ProductCard_ex from "@/components/ProductCard_ex.vue";
const items = [
  {
    id: 1,
    name: "노트북",
    price: 1500000,
    img: "/public/images/business01.png",
  },
  {
    id: 2,
    name: "헤드폰",
    price: 200000,
    img: "/public/images/business01.png",
  },
  {
    id: 3,
    name: "스마트폰",
    price: 1000000,
    img: "/public/images/business01.png",
  },
  {
    id: 3,
    name: "스마트폰",
    price: 1000000,
    img: "/public/images/business01.png",
  },
];
const items1 = [
  { id: 1, name: "노트북", price: 1500000, img: "/images/laptop.png" },
  { id: 2, name: "헤드폰", price: 200000, img: "/images/headphone.png" },
  { id: 3, name: "스마트폰", price: 1000000, img: "/images/phone.png" },
];

const selectedProduct = ref("");

// 자식이 emit으로 보내준 이벤트 처리
const handleSelected = (name) => {
  selectedProduct.value = name; // 선택한 상품 이름 저장
};
</script>

<style scoped lang="scss">
h1 {
  text-align: center;
  color: #333;
}
.home,
.emit {
  text-align: center;
  margin-top: 100px;

  .btn {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    background: #222;
    color: white;
    border-radius: 10px;
    text-decoration: none;
  }
}
.wrap {
  margin: auto;

  max-width: 600px;
}
.cards {
  display: flex;
  justify-content: center;
  div {
    flex: 1;
  }
}
</style>
