<!-- <template>
  <div class="box">
    <h2>📸 사진 리뷰 남기기</h2>

    <input v-model="name" placeholder="이름" />
    <input v-model="rating" type="number" min="1" max="5" placeholder="별점(1~5)" />
    <textarea v-model="text" placeholder="후기를 입력하세요"></textarea>

    <!-- 사진 업로드 -->
    <input type="file" ref="fileInput" @change="uploadImage" />

    <!-- 미리보기 -->
    <div v-if="preview" class="preview">
      <img :src="preview" alt="미리보기" />
    </div>

    <button @click="saveReview">💾 리뷰 저장하기</button>

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

const name = ref("");
const rating = ref("");
const text = ref("");
const preview = ref("");
const reviews = ref([]);
const fileInput = ref(null); // 파일 input ref

// 페이지 열릴 때 localStorage에서 불러오기
onMounted(() => {
  const saved = localStorage.getItem("reviews");
  if (saved) {
    reviews.value = JSON.parse(saved);
  }
});

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

// 리뷰 저장하기
const saveReview = () => {
  if (!name.value || !rating.value || !text.value) {
    alert("이름, 별점, 후기를 모두 입력해주세요!");
    return;
  }

  const newReview = {
    name: name.value,
    rating: rating.value,
    text: text.value,
    image: preview.value,
  };

  reviews.value.push(newReview);
  localStorage.setItem("reviews", JSON.stringify(reviews.value));

  alert("사진 리뷰가 저장됐어요!");

  // 입력창 초기화
  name.value = "";
  rating.value = "";
  text.value = "";
  preview.value = "";
  fileInput.value.value = ""; // ✅ 파일 input 초기화
};

// 리뷰 삭제하기
const deleteReview = (index) => {
  if (confirm("정말 삭제할까요?")) {
    reviews.value.splice(index, 1);
    localStorage.setItem("reviews", JSON.stringify(reviews.value));
  }
};
</script>

<style scoped>
.box {
  width: 330px;
  margin: 40px auto;
  padding: 20px;
  background: #eef6ff;
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
</style> -->
