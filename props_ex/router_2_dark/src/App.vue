<template>
  <div :class="{ dark: isDark }">
    <h1>🛒 SCSS + Props + Emit + 다크모드 + 호버 글자색</h1>
    <button class="toggle-btn" @click="toggleTheme">
      {{ isDark ? "☀️ 라이트모드" : "🌙 다크모드" }}
    </button>

    <ButtonBox label="로그인" color="#4caf50" @clicked="handleClick" />
    <ButtonBox label="회원가입" color="#2196f3" @clicked="handleClick" />
    <Banner
      title="오늘의 할일"
      bg="/public/images/business01.png"
      @clicked="handleClick"
    />

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

    <ProductList :products="items" @selected="handleClick" />

    <p v-if="selectedItem">✅ 선택한 항목: {{ selectedItem }}</p>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
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
const isDark = ref(false);

const toggleTheme = () => (isDark.value = !isDark.value);
const handleClick = (name) => (selectedItem.value = name);

watch(isDark, (val) => {
  document.documentElement.style.setProperty(
    "--bg-color",
    val ? "#121212" : "#f9f9f9"
  );
  document.documentElement.style.setProperty(
    "--text-color",
    val ? "#f9f9f9" : "#222"
  );
  document.documentElement.style.setProperty(
    "--hover-text-color",
    val ? "#000" : "#fff"
  );
});

onMounted(() => {
  document.documentElement.style.setProperty("--bg-color", "#f9f9f9");
  document.documentElement.style.setProperty("--text-color", "#222");
  document.documentElement.style.setProperty("--hover-text-color", "#fff");
});
</script>

<style scoped lang="scss">
.cards {
  display: flex;
  gap: 12px;
  margin: 10px 0;
}

.toggle-btn {
  padding: 8px 16px;
  margin-bottom: 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}
</style>
