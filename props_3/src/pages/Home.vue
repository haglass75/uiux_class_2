<template>
  <main class="home">
  
    <h1>🏠 홈 페이지</h1>
    <router-link to="/reserve" class="btn">예약하러 가기</router-link>
    <router-link to="/review" class="btn">리뷰보러 가기</router-link>
    <!--상품리스트 -->
    <div>
      <h1>🛍️ 상품 리스트</h1>

      <!-- 자식 컴포넌트 호출 -->
      <ProductCard name="노트북" :price="1500000" />
      <ProductCard name="헤드폰" :price="200000" />
    </div>
    <h1>🎨 버튼 샘플</h1>
    <div class="wrap">
      <!-- 부모가 자식에게 props 전달 -->
      <ButtonBox label="로그인" color="#4caf50" />
      <ButtonBox label="회원가입" color="#2196f3" />
      <ButtonBox label="취소" color="#f44336" />
    </div>
    <h2>🛍 상품 카드 예제 1111</h2>
    <div class="wrap">
      <div class="cards">
        <ProductCard_ex
          img="/public/images/main02.png"
          name="가방"
          desc="튼튼하고 멋진 가방이에요"
        />
        <ProductCard_ex
          img="/public/images/main02.png"
          name="운동화"
          desc="가볍고 편한 신발이에요"
        />
      </div>
    </div>
    <div>
      <Banner title="🎉 오늘의 할인!" bg="/public/images/business01.png" />
    </div>
    <h2>🛒 상품 리스트</h2>
    <div class="wrap">
      <ProductList :products="items" />
    </div>
  </main>
  <div class="emit">
    <h1>🛍️ 상품 리스트 emit</h1>
    <div class="cards">
      <!-- 자식 컴포넌트에 props 전달 + 이벤트 수신 -->
      <Product_emit_ex
        v-for="item in items1"
        :key="item.id"
        :img="item.img"
        :name="item.name"
        :price="item.price"
        @selected="handleSelected"
      />
    </div>
    <p v-if="selectedProduct">✅ 선택한 상품: {{ selectedProduct }}</p>
  </div>
</template>

<script setup>
import Banner from "@/components/Banner.vue";
import ButtonBox from "@/components/ButtonBox.vue";
import Product_emit_ex from "@/components/Product_emit_ex.vue";
import ProductCard from "@/components/ProductCard.vue";
import ProductCard_ex from "@/components/ProductCard_ex.vue";
import ProductList from "@/components/ProductList.vue";
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
.home ,.emit{
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
