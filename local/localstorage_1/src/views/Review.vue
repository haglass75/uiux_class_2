<template>
  <div class="box">
    <h2>⭐ 리뷰 남기기</h2>

    <!-- 로그인 안내 -->
    <p v-if="loggedInUser">회원 : {{ loggedInUser }}</p>
    <p v-else>⚠️ 리뷰 작성은 로그인 후 가능합니다.</p>

    <!-- 리뷰 입력창 -->
    <div v-if="loggedInUser" class="form">
      <input v-model="rating" type="number" min="1" max="5" placeholder="별점(1~5)" />
      <textarea v-model="text" placeholder="후기를 입력하세요."></textarea>

      <!-- 사진 업로드 -->
      <input type="file" multiple accept="image/*" @change="handleImages" ref="fileInput" />
      <div class="preview">
        <img v-for="(img, i) in previewImages" :key="i" :src="img" />
      </div>

      <button @click="saveReview">리뷰 저장하기</button>
    </div>

    <!-- 로그인 안한 경우 -->
    <div v-else>
      <button>🔐 로그인하고 리뷰 작성하기</button>
    </div>

    <hr />

    <!-- 모든 리뷰 -->
    <h3>📃 모든 리뷰</h3>
    <div v-if="reviews.length > 0">
      <div v-for="(review, i) in reviews" :key="review.id" class="review">
        <p>👤 이름: {{ review.name }}</p>
        <p>⭐ 별점: {{ review.rating }}</p>
        <p>💬 후기: {{ review.text }}</p>
        <div class="img-wrap" v-if="review.images && review.images.length">
          <img v-for="(img, j) in review.images" :key="j" :src="img" />
        </div>
      </div>
    </div>
    <p v-else>아직 리뷰가 없습니다.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const loggedInUser = ref(null);
const rating = ref("");
const text = ref("");
const reviews = ref([]);
const previewImages = ref([]);
const selectedImages = ref([]);
const fileInput = ref(null); // 파일 input 직접 제어용

// ✅ 기본 더미 리뷰
const dummyReviews = [
  { id: 1, name: "홍길동", rating: 5, text: "정말 편리했어요!", images: [] },
  { id: 2, name: "김철수", rating: 4, text: "보관소 위치가 좋아요.", images: [] },
];

// ✅ 페이지 시작 시 로컬스토리지 확인
onMounted(() => {
  const user = localStorage.getItem("loggedInUser");
  if (user) loggedInUser.value = user;

  const saved = localStorage.getItem("reviews");
  if (saved) reviews.value = JSON.parse(saved);
  else reviews.value = dummyReviews;
});

// ✅ 사진 선택
const handleImages = (e) => {
  const files = e.target.files;
  previewImages.value = [];
  selectedImages.value = [];

  for (let file of files) {
    const reader = new FileReader();
    reader.onload = (event) => {
      previewImages.value.push(event.target.result);
      selectedImages.value.push(event.target.result);
    };
    reader.readAsDataURL(file);
  }
};

// ✅ 리뷰 저장
const saveReview = () => {
  if (!rating.value || !text.value) {
    alert("⚠️ 별점과 후기를 모두 입력해주세요!");
    return;
  }

  const newReview = {
    id: Date.now(),
    name: loggedInUser.value,
    rating: rating.value,
    text: text.value,
    images: selectedImages.value,
  };

  reviews.value.push(newReview);
  localStorage.setItem("reviews", JSON.stringify(reviews.value));

  alert("리뷰가 저장되었습니다!");

  // ✅ 입력창, 사진, 파일 모두 초기화
  rating.value = "";
  text.value = "";
  previewImages.value = [];
  selectedImages.value = [];
  if (fileInput.value) fileInput.value.value = ""; // 파일 input 초기화
};
</script>

<style scoped>
.box {
  width: 340px;
  margin: 40px auto;
  padding: 20px;
  background: #eef5ff;
  border-radius: 12px;
}

.form input,
.form textarea {
  width: 100%;
  margin-bottom: 8px;
  padding: 6px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.preview img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin: 5px;
  border-radius: 8px;
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
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
}

.img-wrap img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin: 3px;
  border-radius: 6px;
}
</style>
