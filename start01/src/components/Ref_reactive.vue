<template>
  <main class="booking">
    <h1>호텔 예약</h1>

    <!-- 날짜 선택 -->
    <div class="form-group">
      <label>
        체크인 날짜:
        <input type="date" v-model="checkIn" />
      </label>
    </div>

    <div class="form-group">
      <label>
        체크아웃 날짜:
        <input type="date" v-model="checkOut" />
      </label>
    </div>

    <!-- 인원 선택 -->
    <div class="form-group">
      <label>
        인원:
        <input type="number" v-model="people" min="1" />
      </label>
    </div>

    <!-- 결과 -->
    <section class="result">
      <!-- <section class="result" v-if="checkIn && checkOut"> -->
      <h2>예약 요약</h2>
      <ul>
        <li>
          체크인 날짜: <strong>{{ checkIn }}</strong>
        </li>
        <li>
          체크아웃 날짜: <strong>{{ checkOut }}</strong>
        </li>
        <li>
          숙박 일수: <strong>{{ nights }} 박</strong>
        </li>
        <li>
          총 인원: <strong>{{ people }} 명</strong>
        </li>
        <li class="price">
          총 금액: <strong>{{ totalPrice.toLocaleString() }} 원</strong>
        </li>
      </ul>
    </section>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";

// ✅ 단일 값: ref
const checkIn = ref("");
const checkOut = ref("");
const people = ref(1);
// console.log(checkIn);
// console.log(checkOut);

// ✅ 계산된 값: computed
// ✅ 숙박 일수를 자동으로 계산하는 computed (계산된 값)
const nights = computed(() => {
  // 만약 체크인 또는 체크아웃 날짜가 없으면 → 숙박일은 0
  if (!checkIn.value || !checkOut.value) return 0;

  // 사용자가 선택한 체크인 날짜를 Date 객체로 바꿈
  const inDate = new Date(checkIn.value);

  // 사용자가 선택한 체크아웃 날짜를 Date 객체로 바꿈
  const outDate = new Date(checkOut.value);

//   console.log(`${inDate} , ${outDate}`);
  // 날짜 차이 계산 (밀리초 단위 → 일 단위로 변환)
  const diff = (outDate - inDate) / (1000 * 60 * 60 * 24);
  //   1초 = 1000 ms
  // 1분 = 60초 = 1000 * 60 ms
  // 1시간 = 60분 = 1000 * 60 * 60 ms
  // 1일 = 24시간 = 1000 * 60 * 60 * 24 ms
  // outDate - inDate → 체크아웃 날짜와 체크인 날짜 차이를 밀리초 단위로 계산
  // / (1000 * 60 * 60 * 24) → 밀리초를 하루 단위로 변환
  // 1000 → 1초
  // * 60 → 1분
  // * 60 → 1시간
  // * 24 → 1일
  // 결과적으로 nights는 "몇 박 며칠인지"를 정확하게 계산할 수 있어요.
  // 만약 차이가 0 이하(잘못 선택한 경우) → 0으로 반환, 아니면 차이값 반환
  return diff > 0 ? diff : 0;
});
// console.log(nights);

// ✅ 1박(하루) 1인당 숙박 요금 (50,000원으로 고정)
const pricePerNight = 50000;

// ✅ 총 금액을 자동으로 계산하는 computed (계산된 값)
const totalPrice = computed(
  () =>
    // 숙박일수 × 인원수 × 1박 요금
    nights.value * people.value * pricePerNight
);

// const totalPrice = computed(() => nights.value * pricePerNight);
</script>

<style scoped>
.booking {
  max-width: 450px;
  margin: auto;
  padding: 1.5rem;
  border-radius: 16px;
  background: #f9fafc;
  font-family: "Segoe UI", sans-serif;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
h1 {
  text-align: center;
  margin-bottom: 1rem;
  color: #2c3e50;
}
.form-group {
  margin-bottom: 1rem;
}
label {
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  color: #34495e;
}
input {
  flex: 1;
  margin-left: 0.5rem;
  padding: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.result {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.result h2 {
  margin-bottom: 0.8rem;
  font-size: 1.1rem;
  color: #2c3e50;
}
.result ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.result li {
  margin: 0.4rem 0;
  font-size: 0.95rem;
  color: #555;
}
.result strong {
  color: #000;
}
.result .price {
  margin-top: 0.8rem;
  font-size: 1.05rem;
  font-weight: bold;
  color: #e74c3c;
}
</style>
