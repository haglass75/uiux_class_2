<template>
  <div>
    <p>{{ userName }}님, {{ shop }} 예약을 {{ date }}에 진행합니다.</p>
    <button @click="$emit('reserve')">예약하기</button>
    <!--  <button @click="emit('reserve')">예약하기</button> -->
  </div>
</template>

<script setup>
// 여러 props를 배열로 받기
// const props = defineProps(["shop", "date", "userName"]);
// // props를 객체로 받아 자료형 지정
// 템플릿 안에서는 $emit('이벤트명') — defineEmits() 안 써도 됨
// <script setup> 안에서는 emit('이벤트명') — defineEmits() 꼭 써야 됨
const props = defineProps({
  shop: String,      // shop은 문자열
  date: String,      // date는 문자열
  userName: String   // userName도 문자열
});
// <!--  <button @click="emit('reserve')">예약하기</button> -->
// 이렇게 쓰면 사용되야함
// const emit = defineEmits(["reserve"]);
</script>
