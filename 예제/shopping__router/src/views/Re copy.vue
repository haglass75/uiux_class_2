<template>
  <div class="home">
    <h1>리뷰</h1>
    <!-- 리뷰 카드 목록 -->
    <div class="reviews">
      <div class="card" v-for="(review, index) in reviews" :key="index">
        <h3>{{ review.user }}</h3>
        <p>{{ review.comment }}</p>
        <span>{{ "⭐".repeat(review.rating) }}</span>
      </div>
    </div>
    <!-- 리뷰 등록하기 -->
    <div class="review">
      <h2>리뷰 남기기</h2>
      <!-- 이름 입력 -->
      <input type="text" v-model="name" placeholder="이름을 입력하세요." />
      <!-- 별점 선택 -->
      <div class="stars">
        <span v-for="n in 5" :key="n" @click="rating = n" :class="{ active: n <= rating }">★</span>
      </div>
      <!-- 후기 작성 -->
      <textarea v-model="reviewTxt" placeholder="후기를 입력하세요."></textarea>
      <!-- 사진 여러장 업로드 -->
      <input type="file" ref="fileInput" @change="uploadImg" accept="image/*" />
      <!-- 등록 버튼 -->
      <button @click="submitReview">등록하기</button>
      <!-- 리뷰 목록 -->
      <div class="review_list" v-if="reviewList.length > 0">
        <h3>작성된 리뷰</h3>
        <div v-for="(item, index) in reviewList" :key="index" class="review_item card">
          <div class="review_header">
            <p>{{ item.name }}</p>
            <p>{{ item.date }}</p>
          </div>
          <p class="stars">
            <span v-for="n in item.rating" :key="n">⭐</span>
          </p>
          <p class="text">{{ item.reviewTxt }}</p>
          <img class="review_image" v-if="item.image" :src="item.image" alt="리뷰사진" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const reviews = [
  { user: "민지", comment: "서비스가 정말 좋아요!", rating: 5 },
  { user: "현우", comment: "배송도 빠르고 친절했습니다 😊", rating: 4 },
  { user: "수연", comment: "깔끔하고 만족스러워요!", rating: 5 },
];

// 정보 받기
const name = ref("");
const reviewTxt = ref("");
const reviewList = ref([]);
const rating = ref(0);
const imageUrl = ref("");
const fileInput = ref(null); // ✅ 파일 input 참조
// 등록하기 버튼 클릭 시
const submitReview = () => {
  // 오늘 날짜 자동 입력
  const today = new Date().toLocaleDateString();
  if (name.value.trim() === "" || rating.value === 0 || reviewTxt.value.trim() === "") {
    alert("이름, 별점, 후기를 모두 입력하세요.");
    return;
  }
  reviewList.value.push({
    name: name.value,
    rating: rating.value,
    reviewTxt: reviewTxt.value,
    date: today,
    image: imageUrl.value,
  });
  // 입력값 초기화
  name.value = "";
  rating.value = 0;
  reviewTxt.value = "";
  imageUrl.value = "";
  // ✅ 파일 input도 수동 초기화
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};
// 사진 업로드 함수
const uploadImg = (e) => {
  const file = e.target.files[0];
  if (file) {
    imageUrl.value = URL.createObjectURL(file);
  }
};
</script>

<style scoped lang="scss">
.reviews {
  text-align: left;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  h3 {
    margin-bottom: 10px;
  }

  span {
    display: inline-block;
    margin-top: 10px;
    font-weight: bold;
  }
}

.review {
  max-width: 450px;
  margin: 50px auto;
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
  h2 {
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
      transition: all 0.3s;
      &.active {
        color: gold;
      }
    }
  }
  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
  }
}
.review_list {
  h3 {
    margin: 20px 0;
  }
  .review_item {
    border-radius: 10px;
    padding: 12px;
    margin-bottom: 12px;

    .review_header {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #555;
      margin-bottom: 4px;
    }

    .text {
      font-size: 14px;
      color: #333;
      margin-bottom: 6px;
    }

    .review_image {
      width: 100%;
      max-height: 200px;
      object-fit: cover;
      border-radius: 8px;
      margin-top: 8px;
    }
  }
}
</style>
