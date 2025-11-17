<script setup>
import { ref, watchEffect } from "vue";
// 현재 활성화된 탭(기본값 : detail)
const activeTab = ref("review");
// 더보기 버튼 상태(초기값 : false)
const isExpaned = ref(false);
// 더보기 버튼 토글 함수
const toggleReadMore = () => {
  isExpaned.value = !isExpaned.value;
};
// 로컬스토리지에서 리뷰 데이터 불러오기
const loadReviews = () => {
  const savedReviews = localStorage.getItem("reviews");
  return savedReviews ? JSON.parse(savedReviews) : [];
};
// 리뷰 목록 (초기값 : 로컬스토리지에서 불러오기)
const reviews = ref(loadReviews());
// 새리뷰 입력 필드 (초기값: 빈값)
const newReview = ref({ name: "", text: "", image: "" });
//  리뷰 추가 함수
const addReview = () => {
  if (newReview.value.name && newReview.value.text) {
    const reviewData = { ...newReview.value };
    if (reivewImage.value) {
      reviewData.image = reivewImage.value;
    }
    reviews.value.unshift(reviewData);
    // reviews.value.push(reviewData);
    localStorage.setItem("reviews", JSON.stringify(reviews.value));
    // 입력필드 초기화
    newReview.value = { name: "", text: "", image: "" };
    reivewImage.value = null;
  }
};
// 로컬 스토리지 데이터 변경시 자동저장
// watchEffect(() => {
//   localStorage.setItem("reviews", JSON.stringify(reviews.value));
// });
console.log("리뷰 목록", reviews.value);
// 리뷰이미지 (초기값 :null)
const reivewImage = ref(null);
// 리뷰 이미지 처리 함수
const handleReviewImage = (event) => {
  // event.target.files : 사용자가 업로드한 파일 목록(filelist)
  // [0] : 사용자가 선택한 첫번째 파일을 가져옴
  const file = event.target.files[0];
  //   console.log(file);
  //   console.log(event.target.files);
  if (file) {
    // console.log("선택한 파일:" ,file );
    // 파일을 읽어올수 있도록 FileReader객체 생성
    const reader = new FileReader();
    reader.onload = (e) => {
      reivewImage.value = e.target.result;
    };
    // 파일을 읽어서 Data URl(이미지를 base64로 변환한 문자열)
    reader.readAsDataURL(file);
  }
};
</script>
<template>
  <div class="container">
    <!-- 탭메뉴 -->
    <div class="tabs">
      <button
        @click="activeTab = 'detail'"
        :class="{ active: activeTab === 'detail' }">
        상세정보
      </button>
      <button
        @click="activeTab = 'review'"
        :class="{ active: activeTab === 'review' }">
        리뷰
      </button>
    </div>
    <!-- 상세정보 -->
    <div class="content" v-if="activeTab === 'detail'">
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
      <div class="image-container" :class="{ expened: isExpaned }">
        <img src="/public/images/image.png" alt="상세이미지" />
        <div class="gradient-overlay" v-if="!isExpaned"></div>
      </div>
      <button class="moreBtn" @click="toggleReadMore">
        {{ isExpaned ? "접기" : "더보기" }}
      </button>
    </div>
    <!-- 리뷰 -->
    <div class="content" v-if="activeTab === 'review'">
      <h2>리뷰 작성</h2>
      <form @submit.prevent="addReview">
        <input
          v-model="newReview.name"
          type="text"
          placeholder="이름"
          required />
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
            <strong>{{ review.name }}</strong> : {{ review.text }}
          </div>
          <div v-if="review.image" class="review-image">
            <img :src="review.image" alt="리뷰이미지" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
ul {
  padding: 0;
}
li {
  background: #f9f9f9;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
}
.container {
  max-width: 600px;
  margin: auto;
}
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
  background-color: #42b983;
  color: #fff;
  font-weight: bold;
}
.image-container {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}
.image-container.expened {
  height: 3600px;
}
.image-container img {
  width: 100%;
}
.gradient-overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(to bottom, rgba(225, 225, 225, 0) 0%, white 100%);
}
/* 리뷰 */

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
</style>
