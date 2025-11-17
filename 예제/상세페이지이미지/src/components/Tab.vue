<template>
  <div class="container">
    <!-- 탭 메뉴 -->
    <div class="tabs">
      <button
        @click="activeTab = 'detail'"
        :class="{ active: activeTab === 'detail' }">
        상세 정보
      </button>
      <button
        @click="activeTab = 'review'"
        :class="{ active: activeTab === 'review' }">
        리뷰 ({{ reviews.length }})
      </button>
    </div>

    <!-- 상세 정보 -->
    <div v-if="activeTab === 'detail'" class="content">
      <h2>제품 상세 설명</h2>
      <p>
        이 이어폰은 최상의 음질을 제공하며, 무선으로 편리하게 사용할 수
        있습니다.
      </p>
      <ul>
        <li>✔ 블루투스 5.0 지원</li>
        <li>✔ 최대 24시간 사용 가능</li>
        <li>✔ 노이즈 캔슬링 기능 포함</li>
      </ul>
      <div class="image-container" :class="{ expanded: isExpanded }">
        <img src="/public/images/image.png" alt="상세 이미지" />
        <div class="gradient-overlay" v-if="!isExpanded"></div>
      </div>
      <button @click="toggleReadMore" class="moreBtn">
        {{ isExpanded ? "접기" : "더보기" }}
      </button>
    </div>

    <!-- 리뷰 페이지 -->
    <div v-if="activeTab === 'review'" class="content">
      <h2>리뷰 작성</h2>
      <form @submit.prevent="addReview">
        <input v-model="newReview.name" placeholder="이름" required />
        <textarea
          v-model="newReview.text"
          placeholder="리뷰를 작성하세요"
          required></textarea>
        <input type="file" @change="handleReviewImage" accept="image/*" />
        <button type="submit">리뷰 등록</button>
      </form>

      <h3>사용자 리뷰</h3>
      <ul v-if="reviews.length">
        <li v-for="(review, index) in reviews" :key="index" class="review-item">
          <div class="txt">
            <strong>{{ review.name }}</strong>
            : {{ review.text }}
          </div>
          <div v-if="review.image" class="review-image">
            <img :src="review.image" alt="리뷰 이미지" />
          </div>
        </li>
      </ul>
      <p v-else>아직 리뷰가 없습니다.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 탭 상태
const activeTab = ref("detail");

// 리뷰 데이터
const reviews = ref([]);
const newReview = ref({ name: "", text: "", image: "" });

// 리뷰 이미지 데이터
const reviewImage = ref(null);

// 리뷰 추가 함수
const addReview = () => {
  if (newReview.value.name && newReview.value.text) {
    const reviewData = { ...newReview.value };
    if (reviewImage.value) {
      reviewData.image = reviewImage.value;
    }
    reviews.value.push(reviewData);
    newReview.value = { name: "", text: "", image: "" };
    reviewImage.value = null; // 이미지 초기화
  }
};

// 리뷰 이미지 처리 함수
const handleReviewImage = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      reviewImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// 이미지 업로드 함수
const uploadImage = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      product.value.images.push(e.target.result);
    };
    reader.readAsDataURL(file);
  }
};

const isExpanded = ref(false);

const toggleReadMore = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<style scoped>
/* 전체 컨테이너 */
.container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

/* 탭 버튼 */
.tabs {
  display: flex;
  border-bottom: 2px solid #ddd;
  margin-bottom: 10px;
}
.tabs button {
  flex: 1;
  padding: 10px;
  border: none;
  background: #d3d3d3;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
}
.tabs button.active {
  background: #42b983;
  color: white;
  font-weight: bold;
}
.tabs button:hover {
  background: #ddd;
}

/* 탭 내용 */
.content {
  padding: 10px;
}

/* 리뷰 폼 */
form {
  display: flex;
  flex-direction: column;
}
input,
textarea {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
}
button {
  padding: 10px;
  border: none;
  background: #42b983;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background: #369670;
}

/* 리뷰 리스트 */
ul {
  list-style: none;
  padding: 0;
}
li {
  background: #f9f9f9;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
}
.review-image img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
}
.review-item {
  display: flex;
  justify-content: space-around;
}
.image-container {
  width: 600px;
  height: 500px;
  overflow: hidden;
  position: relative;
  transition: height 0.3s ease;
}

.image-container.expanded {
  height: 3600px;
}

img {
  width: 100%;
  display: block;
}

.gradient-overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, white 100%);
}
.moreBtn{
  display: block;
  margin: auto;
}
</style>
