<template>
  <div class="contents">
    <h2>📚 예약 사이트 실습 (실무형 버전)</h2>

    <!-- 탭 버튼 -->
    <div class="tabs">
      <button :class="{ active: tab === 'storage' }" @click="tab = 'storage'">🎒 짐 보관</button>
      <button :class="{ active: tab === 'ice' }" @click="tab = 'ice'">🧊 제빙기 청소</button>
    </div>

    <!-- 짐 보관 예약 -->
    <div v-if="tab === 'storage'" class="card">
      <h3>🎒 짐 보관 예약 (최대 5개)</h3>
      <p>남은 예약 가능: {{ 5 - storageReservations.length }}개</p>
      <input v-model="storageForm.name" placeholder="이름 입력" />
      <select v-model.number="storageForm.qty">
        <option disabled value="">짐 개수 선택</option>
        <option v-for="n in 5" :key="n" :value="n">{{ n }}개</option>
      </select>
      <input type="date" v-model="storageForm.date" />
      <button class="reserve-btn" @click="reserveStorage" :disabled="storageReservations.length >= 5">예약하기</button>

      <!-- 예약 리스트 -->
      <div class="result-list" v-if="storageReservations.length">
        <h4>📋 예약 리스트</h4>
        <div v-for="(r, i) in storageReservations" :key="i" class="reservation-card">
          <p>이름: {{ r.name }}</p>
          <p>짐 개수: {{ r.qty }}개</p>
          <p>날짜: {{ r.date }}</p>
          <p>💰 요금: {{ r.qty * 2000 }}원</p>
          <p v-if="r.done" class="done">✅ 완료</p>
          <p v-else class="waiting">⏳ 대기중</p>
          <div class="actions">
            <button @click="toggleDone(r)">상태 변경</button>
            <button @click="deleteReservation(storageReservations, i)">삭제</button>
          </div>
        </div>
        <p class="total">총 요금: {{ totalStoragePrice }}원</p>
      </div>
    </div>

    <!-- 제빙기 청소 예약 -->
    <div v-if="tab === 'ice'" class="card">
      <h3>🧊 제빙기 청소 예약 (최대 3대)</h3>
      <p>남은 예약 가능: {{ 3 - iceReservations.length }}대</p>
      <input v-model="iceForm.store" placeholder="가게 이름 입력" />
      <select v-model.number="iceForm.qty">
        <option disabled value="">제빙기 개수 선택</option>
        <option v-for="n in 3" :key="n" :value="n">{{ n }}대</option>
      </select>
      <input type="date" v-model="iceForm.date" />
      <button class="reserve-btn" @click="reserveIce" :disabled="iceReservations.length >= 3">예약하기</button>

      <!-- 예약 리스트 -->
      <div class="result-list" v-if="iceReservations.length">
        <h4>📋 예약 리스트</h4>
        <div v-for="(r, i) in iceReservations" :key="i" class="reservation-card">
          <p>가게 이름: {{ r.store }}</p>
          <p>제빙기: {{ r.qty }}대</p>
          <p>날짜: {{ r.date }}</p>
          <p>💰 요금: {{ r.qty * 50000 }}원</p>
          <p v-if="r.done" class="done">✅ 완료</p>
          <p v-else class="waiting">⏳ 대기중</p>
          <div class="actions">
            <button @click="toggleDone(r)">상태 변경</button>
            <button @click="deleteReservation(iceReservations, i)">삭제</button>
          </div>
        </div>
        <p class="total">총 요금: {{ totalIcePrice }}원</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue";

const tab = ref("storage");
const today = new Date().toISOString().split("T")[0];

// ------------------ 짐 보관 ------------------
const storageForm = reactive({ name: "", qty: null, date: "" });
const storageReservations = reactive([]);

const reserveStorage = () => {
  if (!storageForm.name || !storageForm.qty || !storageForm.date) {
    alert("모든 내용을 입력해주세요!");
    return;
  }
  storageReservations.push({
    name: storageForm.name,
    qty: storageForm.qty,
    date: storageForm.date,
    done: storageForm.date < today,
  });
  storageForm.name = "";
  storageForm.qty = null;
  storageForm.date = "";
};

// 총 요금 계산
const totalStoragePrice = computed(() => storageReservations.reduce((sum, r) => sum + r.qty * 2000, 0));

// ------------------ 제빙기 청소 ------------------
const iceForm = reactive({ store: "", qty: null, date: "" });
const iceReservations = reactive([]);

const reserveIce = () => {
  if (!iceForm.store || !iceForm.qty || !iceForm.date) {
    alert("모든 내용을 입력해주세요!");
    return;
  }
  iceReservations.push({
    store: iceForm.store,
    qty: iceForm.qty,
    date: iceForm.date,
    done: iceForm.date < today,
  });
  iceForm.store = "";
  iceForm.qty = null;
  iceForm.date = "";
};

// 총 요금 계산
const totalIcePrice = computed(() => iceReservations.reduce((sum, r) => sum + r.qty * 50000, 0));

// ------------------ 공용 함수 ------------------
const deleteReservation = (arr, index) => arr.splice(index, 1);
const toggleDone = (r) => {
  r.done = !r.done;
};
</script>

<style scoped>
.contents {
  /* max-width: 500px; */
  /* margin: auto; */
  padding: 15px;
  font-family: sans-serif;
  text-align: center;
}

/* 탭 */
.tabs {
  display: flex;
  gap: 5px;
  justify-content: center;
  margin-bottom: 15px;
}
.tabs button {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: #f0f0f0;
  cursor: pointer;
  transition: all 0.2s;
}
.tabs button.active {
  background: #007bff;
  color: #fff;
  font-weight: bold;
  border-color: #007bff;
}

/* 카드 */
.card {
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 15px;
  margin-top: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: #fff;
}

/* 입력 */
input,
select {
  display: block;
  width: 100%;
  margin: 8px 0;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

/* 버튼 */
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
.reserve-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* 예약 리스트 */
.result-list {
  margin-top: 15px;
  text-align: left;
}
.reservation-card {
  border: 1px solid #eee;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 8px;
}
.done {
  color: green;
  font-weight: bold;
}
.waiting {
  color: orange;
  font-weight: bold;
}

/* 액션 버튼 */
.actions {
  margin-top: 5px;
}
.actions button {
  margin-right: 5px;
  padding: 5px 8px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}
.actions button:first-child {
  background: #ffc107;
  color: #fff;
}
.actions button:first-child:hover {
  background: #e0a800;
}
.actions button:last-child {
  background: #dc3545;
  color: #fff;
}
.actions button:last-child:hover {
  background: #c82333;
}

/* 총 요금 */
.total {
  font-weight: bold;
  color: #e63946;
  margin-top: 10px;
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
