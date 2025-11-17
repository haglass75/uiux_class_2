<template>
  <div>
    <h2>로컬에 여러개 저장하기</h2>
    
    <!-- 로그인되어있으면  리뷰작성하기  -->
    <h2>⭐ 리뷰 남기기</h2>
    <!-- 입력창 -->
    <input v-model="name" placeholder="이름" />
    <input v-model="rating" type="number" min="1" max="5" placeholder="별점(1~5)" />
    <textarea v-model="text" placeholder="후기를 입력하세요"></textarea>

    <button @click="saveReview">💾 리뷰 저장하기</button>

    <hr />

    <h3>📃 저장된 리뷰 목록</h3>
    <div v-for="(review, i) in reviews" :key="i" class="review">
      <p>👤 이름: {{ review.name }}</p>
      <p>⭐ 별점: {{ review.rating }}</p>
      <p>💬 후기: {{ review.text }}</p>
    </div>

    <!-- 로그인되어있으면  리뷰작성하기  -->
  </div>
</template>
<script setup>
// 🧠 먼저 이해하기!

// localStorage는
// 📒 “메모장”처럼 하나의 글만 저장하는 게 기본이야.
// 하지만,
// 리뷰는 여러 개가 필요하지? (예: 별점 + 후기 여러 개!)

// 그래서 배열(Array) 로 여러 개를 한 번에 저장해야 해.
// 그런데 localStorage는 문자만 저장할 수 있어서
// 👉 배열을 “문자처럼 바꿔서” 저장해야 해!

// 이럴 때 쓰는 게 바로
// ✅ JSON.stringify() (객체 → 문자열로 바꾸기)
// ✅ JSON.parse() (문자열 → 객체로 다시 바꾸기)
import { ref, onMounted } from "vue";

const name = ref("");
const rating = ref("");
const text = ref("");
const reviews = ref([]);

// 페이지 켜질 때 localStorage에서 불러오기
onMounted(() => {
  const saved = localStorage.getItem("reviews");
  if (saved) {
    reviews.value = JSON.parse(saved); // 문자열 → 배열로 복원
  }
});

// 리뷰 저장하기
const saveReview = () => {
  const newReview = {
    name: name.value,
    rating: rating.value,
    text: text.value,
  };

  // 배열에 새 리뷰 추가
  reviews.value.push(newReview);

  // localStorage에 저장 (배열 → 문자열로 바꾸기)
  localStorage.setItem("reviews", JSON.stringify(reviews.value));

  alert("리뷰가 저장됐어요!");

  // 입력창 비우기
  name.value = "";
  rating.value = "";
  text.value = "";
};
</script>

<style scoped>
.box {
  width: 320px;
  margin: 40px auto;
  padding: 20px;
  background: #eef5ff;
  border-radius: 12px;
}
input,
textarea {
  width: 100%;
  margin-bottom: 8px;
  padding: 6px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
button {
  width: 100%;
  background: #0a66c2;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
}
.review {
  background: white;
  border-radius: 8px;
  padding: 10px;
  margin-top: 10px;
}
</style>
