<template>
  <div class="review">
    <h2>📝 리뷰 남기기</h2>

    <!-- 이름 입력 -->
    <input v-model="name" placeholder="이름을 입력하세요" />

    <!-- 별점 선택 -->
    <div class="stars">
      <span v-for="n in 5" :key="n" @click="rating = n" :class="{ active: n <= rating }"> ★ </span>
    </div>

    <!-- 후기 작성 -->
    <textarea v-model="reviewText" placeholder="후기를 입력해주세요"></textarea>

    <!-- 사진 여러 장 업로드 -->
    <input type="file" @change="uploadImages" accept="image/*" multiple />

    <!-- 미리보기 -->
    <div class="preview" v-if="imageUrls.length > 0">
      <img v-for="(img, i) in imageUrls" :key="i" :src="img" alt="사진 미리보기" />
    </div>

    <!-- 등록 버튼 -->
    <button @click="submitReview">등록하기</button>

    <!-- 리뷰 목록 -->
    <div v-if="reviewList.length > 0" class="review-list">
      <h3>💬 작성된 리뷰</h3>

      <div v-for="(item, index) in reviewList" :key="index" class="review-item">
        <div class="review-header">
          <p class="name">{{ item.name }}</p>
          <p class="date">{{ item.date }}</p>
        </div>

        <p class="stars">
          <span v-for="n in item.rating" :key="n">⭐</span>
        </p>

        <p class="text">{{ item.text }}</p>

        <!-- 여러 장 이미지 표시 -->
        <div class="review-images" v-if="item.images && item.images.length">
          <img v-for="(img, i) in item.images" :key="i" :src="img" alt="리뷰 사진" class="review-image" />
        </div>

        <!-- 삭제 버튼 -->
        <button class="delete-btn" @click="deleteReview(index)">삭제 ❌</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const name = ref("");
const rating = ref(0);
const reviewText = ref("");
const reviewList = ref([]);
const imageUrls = ref([]);

// ✅ 페이지 열릴 때 저장된 리뷰 불러오기
onMounted(() => {
  const saved = localStorage.getItem("reviews");
  if (saved) {
    reviewList.value = JSON.parse(saved);
  }
});

// ✅ 여러 장 사진 업로드
const uploadImages = (e) => {
  const files = e.target.files;
  imageUrls.value = [];

  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader();
    reader.onload = (event) => {
      imageUrls.value.push(event.target.result);
    };
    reader.readAsDataURL(files[i]);
  }
};

// ✅ 리뷰 등록
const submitReview = () => {
  if (name.value.trim() === "" || rating.value === 0 || reviewText.value.trim() === "") {
    alert("이름, 별점, 후기를 모두 입력해주세요 🙏");
    return;
  }

  const today = new Date().toLocaleDateString();

  const newReview = {
    name: name.value,
    rating: rating.value,
    text: reviewText.value,
    date: today,
    images: imageUrls.value,
  };

  reviewList.value.push(newReview);

  // ✅ 로컬스토리지 저장
  localStorage.setItem("reviews", JSON.stringify(reviewList.value));

  // 입력 초기화
  name.value = "";
  rating.value = 0;
  reviewText.value = "";
  imageUrls.value = [];
};

// ✅ 리뷰 삭제
const deleteReview = (index) => {
  if (confirm("정말 이 리뷰를 삭제할까요? 😢")) {
    reviewList.value.splice(index, 1);
    localStorage.setItem("reviews", JSON.stringify(reviewList.value));
  }
};
</script>

<style scoped lang="scss">
$main-color: #007bff;
$light-bg: #f8f9fa;

.review {
  max-width: 480px;
  margin: 50px auto;
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: center;

  h2 {
    color: $main-color;
    margin-bottom: 20px;
  }

  input,
  textarea {
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
  }

  input[type="file"] {
    border: none;
  }

  textarea {
    resize: none;
    height: 80px;
  }

  .stars {
    font-size: 28px;
    color: #ccc;
    cursor: pointer;
    margin-bottom: 10px;

    span {
      transition: color 0.3s;
      &.active {
        color: #ffcc00;
      }
    }
  }

  .preview {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 6px;
    margin-bottom: 10px;

    img {
      width: 70px;
      height: 70px;
      object-fit: cover;
      border-radius: 8px;
      border: 1px solid #ddd;
    }
  }

  button {
    background: $main-color;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background: darken($main-color, 10%);
    }
  }

  .review-list {
    margin-top: 30px;
    text-align: left;

    .review-item {
      background: $light-bg;
      border-radius: 10px;
      padding: 12px;
      margin-bottom: 12px;

      .review-header {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #555;
        margin-bottom: 4px;
      }

      .stars {
        font-size: 20px;
        color: #ffcc00;
        margin-bottom: 5px;
      }

      .text {
        font-size: 14px;
        color: #333;
        margin-bottom: 6px;
      }

      .review-images {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 6px;

        .review-image {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 8px;
        }
      }

      .delete-btn {
        background: #ff4d4d;
        color: white;
        border: none;
        padding: 6px 10px;
        border-radius: 6px;
        font-size: 12px;
        cursor: pointer;
        margin-top: 6px;
        float: right;

        &:hover {
          background: darken(#ff4d4d, 10%);
        }
      }
    }
  }
}
</style>
