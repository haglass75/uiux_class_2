<template>
  <div class="box">
    <h2>🧳 예약 & 리뷰</h2>

    <!-- 예약 폼 -->
    <h3>예약하기</h3>
    <input v-model="name" placeholder="이름" />
    <input type="date" v-model="date" />
    <select v-model="service">
      <option disabled value="">서비스 선택</option>
      <option>짐보관</option>
      <option>제빙기 청소</option>
    </select>
    <button @click="saveReservation">💾 예약 저장하기</button>

    <hr />

    <!-- 예약 내역 -->
    <h3>📃 예약 내역</h3>
    <div v-for="(res, i) in reservations" :key="i" class="reservation">
      <p>👤 이름: {{ res.name }}</p>
      <p>📅 날짜: {{ res.date }}</p>
      <p>🛠 서비스: {{ res.service }}</p>
      <button @click="deleteReservation(i)">🗑️ 삭제</button>
    </div>

    <hr />

    <!-- 리뷰 폼 -->
    <h3>📸 리뷰 남기기</h3>
    <input v-model="reviewName" placeholder="이름" />
    <input v-model="rating" type="number" min="1" max="5" placeholder="별점(1~5)" />
    <textarea v-model="text" placeholder="후기를 입력하세요"></textarea>
    <input type="file" ref="fileInput" @change="uploadImage" />
    <div v-if="preview" class="preview">
      <img :src="preview" alt="미리보기" />
    </div>
    <button @click="saveReview">💾 리뷰 저장하기</button>

    <!-- 리뷰 목록 -->
    <hr />
    <h3>📃 저장된 리뷰</h3>
    <div v-for="(review, i) in reviews" :key="i" class="review">
      <p>👤 {{ review.name }}</p>
      <p>⭐ {{ review.rating }}</p>
      <p>💬 {{ review.text }}</p>
      <img v-if="review.image" :src="review.image" alt="리뷰 사진" />
      <button @click="deleteReview(i)">🗑️ 삭제</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// 예약 관련
const name = ref("");
const date = ref("");
const service = ref("");
const reservations = ref([]);

// 리뷰 관련
const reviewName = ref("");
const rating = ref("");
const text = ref("");
const preview = ref("");
const fileInput = ref(null);
const reviews = ref([]);

// 페이지 열릴 때 localStorage에서 불러오기
onMounted(() => {
  const savedRes = localStorage.getItem("reservations");
  if (savedRes) reservations.value = JSON.parse(savedRes);

  const savedRev = localStorage.getItem("reviews");
  if (savedRev) reviews.value = JSON.parse(savedRev);
});

// 예약 저장
const saveReservation = () => {
  if (!name.value || !date.value || !service.value) {
    alert("모든 예약 정보를 입력해주세요!");
    return;
  }

  const newRes = {
    name: name.value,
    date: date.value,
    service: service.value,
  };

  reservations.value.push(newRes);
  localStorage.setItem("reservations", JSON.stringify(reservations.value));

  alert("예약이 저장됐어요!");
  name.value = "";
  date.value = "";
  service.value = "";
};

// 예약 삭제
const deleteReservation = (index) => {
  if (confirm("정말 삭제할까요?")) {
    reservations.value.splice(index, 1);
    localStorage.setItem("reservations", JSON.stringify(reservations.value));
  }
};

// 사진 업로드
const uploadImage = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    preview.value = reader.result;
  };
};

// 리뷰 저장
const saveReview = () => {
  if (!reviewName.value || !rating.value || !text.value) {
    alert("이름, 별점, 후기를 모두 입력해주세요!");
    return;
  }

  const newReview = {
    name: reviewName.value,
    rating: rating.value,
    text: text.value,
    image: preview.value,
  };

  reviews.value.push(newReview);
  localStorage.setItem("reviews", JSON.stringify(reviews.value));

  alert("리뷰가 저장됐어요!");

  // 입력창 초기화
  reviewName.value = "";
  rating.value = "";
  text.value = "";
  preview.value = "";
  fileInput.value.value = "";
};

// 리뷰 삭제
const deleteReview = (index) => {
  if (confirm("정말 삭제할까요?")) {
    reviews.value.splice(index, 1);
    localStorage.setItem("reviews", JSON.stringify(reviews.value));
  }
};
</script>

<style scoped>
.box {
  width: 350px;
  margin: 40px auto;
  padding: 20px;
  background: #eef6ff;
  border-radius: 12px;
}
input,
select,
textarea {
  width: 100%;
  padding: 6px;
  margin-bottom: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
button {
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  border: none;
  background: #0a66c2;
  color: white;
  cursor: pointer;
  margin-top: 5px;
}
button:hover {
  background: #004a99;
}
.preview img {
  width: 100%;
  border-radius: 8px;
  margin-top: 8px;
}
.reservation,
.review {
  background: white;
  border-radius: 8px;
  padding: 10px;
  margin-top: 10px;
}
.review img {
  width: 100%;
  border-radius: 8px;
  margin-top: 5px;
}
</style>
