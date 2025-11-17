<template>
  <div>
    <h2>📚 예약 사이트 연습</h2>

    <!-- 탭 버튼 -->
    <button @click="tab = 'storage'">짐 보관</button>
    <button @click="tab = 'ice'">제빙기 청소</button>

    <hr />

    <!-- 짐 보관 -->
    <div v-if="tab === 'storage'">
      <h3>🎒 짐 보관 예약</h3>
      <input v-model="storageForm.name" placeholder="이름 입력" />
      <select v-model="storageForm.qty">
        <option disabled value="">짐 개수 선택</option>
        <option v-for="n in 5" :key="n" :value="n">{{ n }}개</option>
      </select>
      <input type="date" v-model="storageForm.date" />
      <button @click="reserveStorage">예약하기</button>

      <div v-if="storageReserved">
        <p>이름 : {{ storageForm.name }}</p>
        <p>짐 개수 : {{ storageForm.qty }}개</p>
        <p>날짜 : {{ storageForm.date }}</p>
        <p>요금 : {{ storagePrice }}원</p>
      </div>
    </div>

    <!-- 제빙기 청소 -->
    <div v-if="tab === 'ice'">
      <h3>🧊 제빙기 청소 예약</h3>
      <input v-model="iceForm.store" placeholder="가게 이름 입력" />
      <select v-model="iceForm.qty">
        <option disabled value="">제빙기 개수 선택</option>
        <option v-for="n in 3" :key="n" :value="n">{{ n }}대</option>
      </select>
      <input type="date" v-model="iceForm.date" />
      <button @click="reserveIce">예약하기</button>

      <div v-if="iceReserved">
        <p>가게 이름 : {{ iceForm.store }}</p>
        <p>제빙기 개수 : {{ iceForm.qty }}대</p>
        <p>날짜 : {{ iceForm.date }}</p>
        <p>요금 : {{ icePrice }}원</p>
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
  date: ""
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

watch(() => storageForm.qty, (newVal) => {
  if (newVal >= 5) alert("⚠️ 5개 이상은 추가 비용이 발생합니다!");
});

// 제빙기 청소 예약 ------------------------
const iceForm = reactive({
  store: "",
  qty: "",
  date: ""
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

watch(() => iceForm.qty, (newVal) => {
  if (newVal == 3) alert("⚠️ 3대 이상 청소는 상담이 필요합니다.");
});
</script>

<style scoped>
button {
  margin: 5px;
  padding: 5px 10px;
}
input, select {
  margin: 5px;
  padding: 5px;
}
hr {
  margin: 15px 0;
}
</style>
