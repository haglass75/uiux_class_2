<template>
  <div class="contents">
    <h2>📚 예약 사이트 연습</h2>

    <!-- 탭 버튼 -->
    <div class="tabs">
      <button :class="{ active: tab === 'storage' }" @click="tab = 'storage'">🎒 짐 보관</button>
      <button :class="{ active: tab === 'ice' }" @click="tab = 'ice'">🧊 제빙기 청소</button>
    </div>

    <!-- 짐 보관 카드 -->
    <div v-if="tab === 'storage'" class="card">
      <h3>🎒 짐 보관 예약</h3>
      <input v-model="storageForm.name" placeholder="이름 입력" />
      <select v-model="storageForm.qty">
        <option disabled value="">짐 개수 선택</option>
        <option v-for="n in 5" :key="n" :value="n">{{ n }}개</option>
      </select>
      <input type="date" v-model="storageForm.date" />
      <button class="reserve-btn" @click="reserveStorage">예약하기</button>

      <div v-if="storageReserved" class="result">
        <h4>✅ 예약 완료</h4>
        <p>이름 : {{ storageForm.name }}</p>
        <p>짐 개수 : {{ storageForm.qty }}개</p>
        <p>날짜 : {{ storageForm.date }}</p>
        <p class="price">💰 요금 : {{ storagePrice }}원</p>
      </div>
    </div>

    <!-- 제빙기 청소 카드 -->
    <div v-if="tab === 'ice'" class="card">
      <h3>🧊 제빙기 청소 예약</h3>
      <input v-model="iceForm.store" placeholder="가게 이름 입력" />
      <select v-model="iceForm.qty">
        <option disabled value="">제빙기 개수 선택</option>
        <option v-for="n in 3" :key="n" :value="n">{{ n }}대</option>
      </select>
      <input type="date" v-model="iceForm.date" />
      <button class="reserve-btn" @click="reserveIce">예약하기</button>

      <div v-if="iceReserved" class="result">
        <h4>✅ 예약 완료</h4>
        <p>가게 이름 : {{ iceForm.store }}</p>
        <p>제빙기 개수 : {{ iceForm.qty }}대</p>
        <p>날짜 : {{ iceForm.date }}</p>
        <p class="price">💰 요금 : {{ icePrice }}원</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue";

// 탭 상태
const tab = ref("storage");

// 짐 보관 예약 ------------------------
const storageForm = reactive({
  name: "",
  qty: "",
  date: "",
});
const storageReserved = ref(false);
const storagePrice = computed(() => storageForm.qty * 2000 || 0);

const reserveStorage = () => {
  if (!storageForm.name || !storageForm.qty || !storageForm.date) {
    alert("짐 보관 내용을 모두 입력해주세요!");
    return;
  }
  storageReserved.value = true;
};

watch(
  () => storageForm.qty,
  (newVal) => {
    if (newVal >= 5) alert("⚠️ 5개 이상은 추가 비용이 발생합니다!");
  }
);

// 제빙기 청소 예약 ------------------------
const iceForm = reactive({
  store: "",
  qty: "",
  date: "",
});
const iceReserved = ref(false);
const icePrice = computed(() => iceForm.qty * 50000 || 0);

const reserveIce = () => {
  if (!iceForm.store || !iceForm.qty || !iceForm.date) {
    alert("제빙기 청소 내용을 모두 입력해주세요!");
    return;
  }
  iceReserved.value = true;
};

watch(
  () => iceForm.qty,
  (newVal) => {
    if (newVal == 3) alert("⚠️ 3대 이상 청소는 상담이 필요합니다.");
  }
);
</script>

<style scoped>
.contents {
  /* max-width: 400px; */
  text-align: center;
  font-family: sans-serif;
}
.tabs {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}
.tabs button {
  flex: 1;
  padding: 10px;
  border: none;
  cursor: pointer;
  background: #eee;
}
.tabs button.active {
  background: #007bff;
  color: #fff;
  font-weight: bold;
}
/* 카드 스타일 */
.card {
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 15px;
  margin-top: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: #fff;
}

/* 입력, 선택 박스 */
input,
select {
  display: block;
  width: 100%;
  margin: 8px 0;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

/* 예약 버튼 */
.reserve-btn {
  background: #28a745;
  color: #fff;
  border: none;
  padding: 10px;
  width: 100%;
  margin-top: 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}
.reserve-btn:hover {
  background: #218838;
}

/* 예약 완료 카드 */
.result {
  margin-top: 15px;
  padding: 12px;
  background: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #eee;
  text-align: left;
}
.price {
  font-weight: bold;
  color: #e63946;
}

/* 반응형 */
@media (max-width: 500px) {
  .container {
    padding: 10px;
  }
  .tabs button {
    padding: 8px;
    font-size: 14px;
  }
  .reserve-btn {
    padding: 8px;
  }
}
</style>
