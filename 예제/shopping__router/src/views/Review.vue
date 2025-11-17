<script setup>
import { computed, ref, watchEffect } from "vue";
// 더미 데이터 (변경되지 않는 초기 데이터)
const dummyReviews = [
  {
    name: "홍길동",
    image: "/images/people1.png",
    title: "정말 만족스러워요!",
    content: "서비스가 너무 좋아서 다음에도 이용할 생각입니다.",
  },
  {
    name: "김철수",
    image: "/images/people2.png",
    title: "빠른 배송!",
    content: "배송이 예상보다 빨라서 기분 좋았어요.",
  },
  {
    name: "이영희",
    image: "/images/people3.png",
    title: "깔끔한 포장",
    content: "상품이 깔끔하게 포장되어 있어서 만족합니다.",
  },
  {
    name: "홍길동",
    image: "/images/people4.png",
    title: "정말 만족스러워요!",
    content: "서비스가 너무 좋아서 다음에도 이용할 생각입니다.",
  },
  {
    name: "김철",
    image: "/images/people5.png",
    title: "빠른 배송!",
    content: "배송이 예상보다 빨라서 기분 좋았어요.",
  },
];
// 로컬스토리지에서 불러올 데이터
// 사용자가 새롭게 작성한 리뷰를 저장하고 불러오는 역할
const reviews = ref([]);
//더미데이터 + 로컬스토리지데이터 합치기

const allReviews = computed(() => [...dummyReviews, ...reviews.value]);
// 이름 마스킹(ex:홍길동  홍**)
const maskedName = (name) => {
  console.log(name.length);

  // name.charAt(0) name의 첫번재 글자만 가져옴
  // charAt(0) 문자열 객체의 메서드

  // .repeat(name.length - 1) 나머지 글자 수만큼 *을 붙임
  return name.charAt(0) + "*".repeat(name.length - 1);
};
// 페이지 로드시 로컬스토리지에서 후기 데이털 불러오기
watchEffect(() => {
  const savedReviews = localStorage.getItem("reviews");
  if (savedReviews) {
    reviews.value = JSON.parse(savedReviews);
  }
});
// 글쓰기
const showForm = ref(false);
const newReview = ref({
  name: "",
  title: "",
  content: "",
  image: "",
});
// 이미지 미리보기 저장 변수
// 사용자가 이미지 업로드시 미리보기로 보여줄 base64 데이터를 저장하는 변수
const previewImage = ref("");
// 이미지 업로드 처리
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      previewImage.value = reader.result; //미리보기 이미지 설정
      newReview.value.image = reader.result; // 후기 데이터에도 이미지 추가
    };
  }
};
// 후기 추가 함수
const addReview = () => {
  // 입력값이 모두 채워졌는지 확인(하나라도 비어 있으면 알림)
  if (
    !newReview.value.name ||
    !newReview.value.title ||
    !newReview.value.content
  ) {
    alert("모든 항목을 입력해주세요.");
    return;
  }
  reviews.value.push({
    name: newReview.value.name, //입력된 이름
    title: newReview.value.title,
    content: newReview.value.content,
    // 이미지가 없으면 기본 이미지 사용
    image: newReview.value.image || "/images/default-user.png",
  });
  cancelForm(); // 폼 초기화 및 닫기
};
// 취소버튼
const cancelForm = () => {
  newReview.value = { name: "", title: "", content: "", image: "" }; //입력필드 초기화
  previewImage.value = ""; //이미지 미리보기 초기화
  showForm.value = false;
};
watchEffect(() => {
  localStorage.setItem("reviews", JSON.stringify(reviews.value));
  console.log(`로컬에 저장된 리뷰 : ${reviews.value}`);
});
</script>

<template>
  <div class="review-container">
    <h2>이용후기</h2>
    <!-- 후기 카드 리스트 -->
    <div class="review-list">
      <div
        v-for="(review, index) in allReviews"
        :key="index"
        class="review-card">
        <img :src="review.image" :alt="review.title" class="user-image" />
        <div class="review-cotent">
          <p class="username">{{ maskedName(review.name) }}</p>
          <h3>{{ review.title }}</h3>
          <p>{{ review.content }}</p>
        </div>
      </div>
    </div>
    <!-- 글쓰기 버튼 -->
    <button @click="showForm = !showForm" class="write-btn">
      {{ showForm ? "취소" : "글쓰기" }}
    </button>
    <!-- 후기 작성 폼 -->
    <form v-if="showForm" class="review-form">
      <input type="text" v-model="newReview.name" placeholder="이름" />
      <input type="text" v-model="newReview.title" placeholder="제목" />
      <textarea v-model="newReview.content" placeholder="내용"></textarea>
      <!-- 이미지 업로드 -->
      <input type="file" @change="handleImageUpload" accept="image/*" />
      <img
        v-if="previewImage"
        :src="previewImage"
        alt="이미지 미리보기"
        class="preview-image" />
      <div class="form-buttons">
        <button type="button" @click="addReview">확인</button>
        <button type="button" @click="cancelForm">취소</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.review-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  text-align: center;
}
.review-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.review-card {
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
}
.user-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.review-cotent {
  text-align: left;
}
</style>
