<template>
  <h3>안녕</h3>
  <!-- ref() – 반응형 변수 
   원시값(숫자/문자/불리언)이나 객체/배열/DOM 참조를 Vue의 반응성으로 감싸주는 함수-->
  <button @click="increase">카운트 : {{ count }}</button>
  <!-- reactive() – 반응형 객체 -->
  <p>{{ user.name }} ({{ user.age }}살)</p>
  <!-- computed() – 계산된 값 -->
  <!-- 다른 데이터에 따라 자동으로 값이 바뀌는 계산 전용 변수 -->
  <p>가격: {{ price }}</p>
  <p>세금: {{ tax }}</p>
  <p>총합: {{ formatNumber(total) }}</p>
  <!-- v-model – 양방향 바인딩
입력값을 바로 변수와 연결. -->
  <input v-model="message" placeholder="메시지 입력" />
  <p>입력한 값: {{ message }}</p>
  <!-- watch() – 데이터 감시
특정 데이터가 바뀔 때마다 실행되는 함수. -->
  <input type="text" v-model="name" @input="updateMessage" placeholder="이름 입력" />
  <p>안녕하세요 , {{ name }}</p>
  <!-- watch 화면에 보이게 -->
  <p>이전 이름: {{ oldName }}</p>
  <p>새 이름: {{ newName }}</p>
  <p>현재 이름: {{ name }}</p>
  <Ref_reactive />
  <hr />
  <hr />
  <div class="content">
    <Watch_ex />
    <Computed_ex />
  </div>
  <hr />
  <Total_ex />
</template>

<script setup>
// npm install -D unplugin-auto-import
// import자동 설치
import { computed, reactive, ref, nextTick } from "vue";
import Ref_reactive from "./components/Ref_reactive.vue";
import Watch_ex from "./components/Watch_ex.vue";
import Computed_ex from "./components/Computed_ex.vue";
import Total_ex from "./components/Total_ex.vue";

// console.log("실행됨");
// ref() – 반응형 변수 → Vue가 값을 기억하고, 바뀌면 화면도 자동으로 바뀜
// ref는 값(숫자, 문자열 등)을 반응형으로 만들어줌.
// .value를 붙여서 접근/변경해야 함.
const count = ref(0);
function increase() {
  count.value++;
}
// reactive() – 반응형 객체
// 여러 개의 데이터를 객체/배열로 관리할 때 사용.
const user = reactive({
  name: "홍길동",
  age: 20,
});
// <!-- computed() – 계산된 값 -->
//    <!-- 다른 데이터에 따라 자동으로 값이 바뀌는 계산 전용 변수 -->
// 천 단위 구분 콤마를 적용하려면 formatNumber 함수
const price = ref(1000);
// 천 단위 콤마 함수
const formatNumber = (num) => {
  return num.toLocaleString();
};
const tax = computed(() => {
  return price.value * 0.1;
});
const total = computed(() => {
  return price.value + tax.value;
});
// v-model – 양방향 바인딩
const message = ref("");

// watch() – 데이터 감시

// 특정 데이터가 바뀔 때마다 실행되는 함수.
const name = ref("");
const updateMessage = (event) => {
  nextTick(() => {
    name.value = event.target.value;
  });
};

// watch(name, (newVal, oldVal) => {
//   console.log(`이름변경됨 : ${oldVal} => ${newVal}`);
// });
const oldName = ref(""); // 변경 전 값을 저장할 ref
const newName = ref(""); // 변경 후 값을 저장할 ref

watch(name, (newVal, oldVal) => {
  oldName.value = oldVal; // 화면에 보이도록 ref에 저장
  newName.value = newVal; // 화면에 보이도록 ref에 저장
});
</script>
<style scoped>
.content {
  display: flex;
}
.content div {
  flex: 1;
}
</style>
