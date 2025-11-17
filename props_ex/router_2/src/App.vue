<template>
  <div>
    <h1>🛒 통합 컴포넌트 예제</h1>

    <!-- 버튼 -->
    <ButtonBox label="로그인" color="#4caf50" @clicked="handleClick" />
    <ButtonBox label="회원가입" color="#2196f3" @clicked="handleClick" />

    <!-- 배너 -->
    <Banner
      title="오늘의 할인!"
      bg="/images/banner.jpg"
      @clicked="handleClick"
    />

    <!-- 상품 카드 -->
    <div class="cards">
      <ProductCard
        v-for="item in items"
        :key="item.id"
        :img="item.img"
        :name="item.name"
        :price="item.price"
        @selected="handleClick"
      />
    </div>

    <!-- 상품 리스트 -->
    <ProductList :products="items" @selected="handleClick" />

    <!-- 선택 정보 표시 -->
    <p v-if="selectedItem">✅ 선택한 항목: {{ selectedItem }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ButtonBox from "./components/ButtonBox.vue";
import ProductCard from "./components/ProductCard.vue";
import Banner from "./components/Banner.vue";
import ProductList from "./components/ProductList.vue";

const items = [
  { id: 1, name: "노트북", price: 1500000, img: "/images/laptop.png" },
  { id: 2, name: "헤드폰", price: 200000, img: "/images/headphone.png" },
  { id: 3, name: "스마트폰", price: 1000000, img: "/images/phone.png" },
];

const selectedItem = ref("");

// 모든 자식 이벤트를 여기서 처리
const handleClick = (name) => {
  selectedItem.value = name;
};
</script>

<style scoped>
.cards {
  display: flex;
  gap: 12px;
  margin: 10px 0;
}
</style>
