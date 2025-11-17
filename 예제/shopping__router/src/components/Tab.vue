<script setup>
import Re from "@/views/Re.vue";
import { ref, watchEffect } from "vue";

// 현재 활성화된 탭(기본값 : detail)
const activeTab = ref("detail");

// 더보기 버튼 상태(초기값 : false)
const isExpended = ref(false);

// 더보기 버튼 토글 함수
const toggleReadMore = () => {
  isExpended.value = !isExpended.value;
};

// // 5. 로컬스토리지에서 리뷰 데이터 불러오기
// const loadReviews = () => {
//   const savedReviews = localStorage.getItem("reviews");
//   return savedReviews ? JSON.parse(savedReviews) : [];
// };

// // 4. 리뷰 목록 초기화(초기값 : 로컬스토리지에서 불러오기)
// const reviews = ref(loadReviews());

// // 1. 새리뷰 입력 필드(초기값 : 빈값)
// const newReview = ref({
//   name: "",
//   text: "",
//   image: "",
// });

// // 2. 리뷰 추가 함수
// const addReview = () => {
//   if (newReview.value.name && newReview.value.name) {
//     const reviewDate = { ...newReview.value };
//     if (reviewImage.value) {
//       reviewDate.image = reviewImage.value;
//     }
//     // reviews.value.push(reviewDate)
//     reviews.value.unshift(reviewDate);
//     localStorage.setItem("reviews", JSON.stringify(reviews.value));

//     // 입력필드 초기화
//     newReview.value = { name: "", text: "", image: "" };
//     reviewImage.value = null;
//   }
// };

// // 로컬스토리지에 데이터 변경 시 자동으로 저장시켜주는 함수
// watchEffect(() => {
//   localStorage.setItem("리뷰들", JSON.stringify(reviews.value));
// });

// // 6. 리뷰 이미지(초기값 : null)
// const reviewImage = ref(null);

// // 3. 리뷰 이미지 처리 함수
// const handleReviewImage = (event) => {
//   // event.target.files : 사용자가 업로드한 파일 목록좀 찾을게~.
//   // [0] : 사용자가 선택한 첫번째 파일을 가져옴.
//   const file = event.target.files[0];
//   // console.log(file);
//   // console.log(event.target.files);
//   if (file) {
//     // console.log("선택한파일 : ", file);
//     // 파일을 읽어올 수 있도록 FileReader 객체 생성
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       reviewImage.value = e.target.result;
//     };
//     // 파일을 읽어서 Data URL(이미지를 base64로 변환한 문자열)
//     // base64 : 이미지를 코드화
//     reader.readAsDataURL(file);
//     // console.log(reader);
//   }
// };
</script>

<!-- 템플릿 -->
<template>
  <div class="container">
    <!-- 탭메뉴 -->
    <div class="tabs">
      <button @click="activeTab = 'detail'" :class="{ active: activeTab === 'detail' }">상세정보</button>
      <button @click="activeTab = 'review'" :class="{ active: activeTab === 'review' }">리뷰</button>
    </div>
    <!-- 상세정보 영역 -->
    <div class="content" v-if="activeTab === 'detail'">
      <h2>제품 상세 설명</h2>
      <p>이 이어폰은 최상의 음질을 제공하며, 무선으로 편리하게 사용할 수 있습니다.</p>
      <ul>
        <li>✔ 블루투스 5.0 지원</li>
        <li>✔ 최대 24시간 사용 가능</li>
        <li>✔ 노이즈 캔슬링 기능 포함</li>
      </ul>
      <div class="img-container" :class="{ expended: isExpended }">
        <img src="/public/images/detail_img.jpg" alt="상세이미지" />
        <div class="gradient-overlay" v-if="!isExpended"><!-- 빈공간으로 두기 --></div>
      </div>
      <button class="moreBtn" @click="toggleReadMore">{{ isExpended ? "접기" : "더보기" }}</button>
    </div>

    <!-- 리뷰 영역 -->
    <!-- <div class="content" v-if="activeTab === 'review'">
      <h2>리뷰 작성</h2>
      <form @submit.prevent="addReview">
        <input v-model="newReview.name" type="text" placeholder="이름" required />
        <textarea v-model="newReview.text" placeholder="리뷰를 작성하세요." required></textarea>
        <input @change="handleReviewImage" type="file" accept="image/*" />
        <button type="submit">리뷰 등록</button>
      </form>
      <h3>사용자 리뷰</h3>
      <ul v-if="reviews.length">
        <li v-for="(review, i) in reviews" :key="i" class="review-item">
          <div class="txt">
            <strong>{{ review.name }}</strong> : {{ review.text }}
          </div>
          <div v-if="review.image" class="review-img">
            <img :src="review.image" alt="리뷰이미지" />
          </div>
        </li>
      </ul>
    </div > -->
    <Re class="content" v-if="activeTab === 'review'"/>
  </div>
</template>

<!-- 스타일 -->
<style scoped>
.container {
  max-width: 800px;
  margin: 50px auto;
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
.content ul {
  list-style: none;
  padding: 0;
}
.content ul li {
  background: #f9f9f9;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
}
.img-container {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  transition: all 0.3s ease;
}
.img-container.expended {
  height: 3600px;
}
/* .img-container.expended .gradient-overlay{
    display: none;
} */
.img-container img {
  width: 100%;
}
.gradient-overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(to bottom, rgba(225, 225, 225, 0) 0%, white 100%);
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
.review-img img {
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
