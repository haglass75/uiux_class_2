<template>
  <div class="home">
    <div class="review">
      <!-- 더미데이터 -->
      <div class="review-list">
        <h3>💬 사용자 리뷰</h3>
        <div class="re-list-dumy">
          <div v-for="(item, index) in dummyReviews" :key="index" class="review-item">
            <div class="review-header">
              <p class="name">{{ item.name }}</p>
              <p class="date">{{ item.date }}</p>
            </div>

            <p class="stars">
              <span v-for="n in item.rating" :key="n">⭐</span>
            </p>
            <div class="tex-img">
              <p class="text">{{ item.text }}</p>

              <!-- 여러 장 이미지 표시 -->
              <div class="review-images">
                <img :src="item.images" :key="i" alt="리뷰 사진" class="review-image" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 리뷰 목록 -->
      <div v-if="reviewList.length > 0" class="review-list">
        <h3>💬 작성한 리뷰</h3>
        <div class="re-list-dumy">
          <div v-for="(item, index) in reviewList" :key="index" class="review-item">
            <div class="review-header">
              <p class="name">{{ item.name }}</p>
              <p class="date">{{ item.date }}</p>
            </div>

            <p class="stars">
              <span v-for="n in item.rating" :key="n">⭐</span>
            </p>
            <div class="tex-img">
              <p class="text">{{ item.text }}</p>

              <!-- 여러 장 이미지 표시 -->
              <div class="review-images" v-if="item.images && item.images.length">
                <img v-for="(img, i) in item.images" :key="i" :src="img" alt="리뷰 사진" class="review-image" />
              </div>
            </div>

            <!-- 삭제 버튼 -->
            <button class="delete-btn" @click="deleteReview(index)">삭제 ❌</button>
          </div>
        </div>
      </div>
    </div>

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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const i = 0;
const name = ref("");
const rating = ref(0);
const reviewText = ref("");
const reviewList = ref([]);
const imageUrls = ref([]);

// ✅ 더미 데이터 4개
const dummyReviews = [
  { name: "민지", rating: 5, text: "서비스가 정말 좋아요!", date: "2025-10-17", images: "/images/img-1.png" },
  { name: "현우", rating: 4, text: "배송도 빠르고 친절했습니다 😊", date: "2025-10-16", images: "/images/img-2.png" },
  { name: "수연", rating: 5, text: "깔끔하고 만족스러워요!", date: "2025-10-15", images: "/images/img-4.png" },
  { name: "지훈", rating: 3, text: "조금 아쉬웠지만 괜찮아요.", date: "2025-10-14", images: "/images/img-3.png" },
];

// 페이지 열릴 때 로컬스토리지 불러오기 + 없으면 더미 데이터
// 페이지가 열릴 때 실행되는 함수예요
// localStorage에 저장된 리뷰가 있으면 불러오고, 없으면 더미 데이터 4개 보여주기
onMounted(() => {
  // localStorage에서 "reviews"라는 이름으로 저장된 값 가져오기
  const saved = localStorage.getItem("reviews");
  if (saved) {
    // 저장된 게 있으면 JSON 문자열을 배열로 바꿔서 reviewList에 넣기
    reviewList.value = JSON.parse(saved);
  } else {
    // 저장된 게 없으면 dummyReviews 4개를 보여주기
    reviewList.value = dummyReviews;
  }
});

// ✅ 여러 장 사진 업로드
const uploadImages = (e) => {
  // console.log(e.target.files);

  // input에 선택한 파일들을 가져오기
  const files = e.target.files;
  // 기존에 있던 미리보기 사진 초기화
  imageUrls.value = [];

  // 선택한 파일 개수만큼 반복
  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader(); // 파일을 읽는 도구 만들기
    // 파일을 다 읽으면 실행되는 함수
    reader.onload = (event) => {
      // 읽은 이미지를 imageUrls 배열에 추가
      imageUrls.value.push(event.target.result);
    };
    // 파일을 읽어서 "Data URL" 형식으로 변환하기(이미지를 문자열로 바꿔서 화면에 보여줄 수 있음)
    reader.readAsDataURL(files[i]);
  }
};

// ✅ 리뷰 등록 버튼 누르면 실행되는 함수
const submitReview = () => {
  // 이름, 별점, 후기가 하나라도 없으면 경고
  if (name.value.trim() === "" || rating.value === 0 || reviewText.value.trim() === "") {
    alert("이름, 별점, 후기를 모두 입력해주세요 🙏");
    return; // 여기서 함수 종료
  }

  // 오늘 날짜 가져오기
  const today = new Date().toLocaleDateString();

  // 새로운 리뷰 객체 만들기
  const newReview = {
    name: name.value, // 이름
    rating: rating.value, // 별점
    text: reviewText.value, // 후기 내용
    date: today, // 오늘 날짜
    images: imageUrls.value, // 업로드한 사진들
  };

  // reviewList 배열에 새 리뷰 추가
  reviewList.value.push(newReview);

  // localStorage에 저장하기(웹페이지를 닫아도 남게)
  localStorage.setItem("reviews", JSON.stringify(reviewList.value));

  // 입력칸과 별점, 사진 초기화
  name.value = "";
  rating.value = 0;
  reviewText.value = "";
  imageUrls.value = [];
};

// ✅ 리뷰 삭제 버튼 누르면 실행되는 함수
const deleteReview = (index) => {
  // 확인 창 띄우기
  if (confirm("정말 이 리뷰를 삭제할까요? 😢")) {
    // reviewList에서 index번째 리뷰 삭제
    reviewList.value.splice(index, 1);
    // 삭제 후 localStorage에 저장
    localStorage.setItem("reviews", JSON.stringify(reviewList.value));
  }
};
</script>

<style scoped lang="scss">
$main-color: #007bff;
$light-bg: #f8f9fa;
.home {
  // display: flex;
}
.review {
  // flex: 1;
  // max-width: 480px;
  // margin: 50px auto;
  // display: grid;
  // grid-template-columns: repeat(auto-fit , minmax(200px , 1fr));
  background: #e4e4e4;
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
    // margin-bottom: 10px;

    span {
      transition: color 0.3s;
      &.active {
        color: #ffcc00;
      }
    }
  }
  .tex-img {
    display: flex;
    justify-content: space-between;
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
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 6px;
    .re-list-dumy {
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
    .review-item {
      background: $light-bg;
      border-radius: 10px;
      padding: 12px;
      // margin-bottom: 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;

      .review-header {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #555;
      }

      .stars {
        font-size: 20px;
        color: #ffcc00;
      }

      .text {
        font-size: 14px;
        color: #333;
      }

      .review-images {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;

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
         // background: darken(#ff4d4d, 10%);
        }
      }
    }
  }
}
.dumy-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr 1fr));
}
</style>
