<template>
  <div>
    <h2>안녕하세요, {{ name }}님!</h2>
    <p>나이는 {{ age }}살 입니다.</p>
    <button @click="onClick">눌러보기</button>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

// defineProps()
// 역할
// 부모가 자식에게 데이터를 전달할 때 사용하는 도구
// 자식 컴포넌트 안에서 부모가 준 데이터를 받는 창구 같은 거예요.
// 비유
// 부모가 자식에게 “이름”을 주면
// 자식은 defineProps()를 통해 그 이름을 받아서 화면에 보여줄 수 있음
// props 정의
// emit()
// 역할
// 자식이 부모에게 신호(이벤트)를 보낼 때 사용하는 도구
// 자식 → 부모 데이터 전달 또는 알림
// 비유
// 자식이 부모에게 “나 버튼 눌렀어!”라고 말하는 것
// 부모 → (props) → 자식
// 부모 ← (emit) ← 자식
const props = defineProps({
  name: String, // 문자열 타입
  age: Number, // 숫자 타입
});
const emit = defineEmits(["clicked"]);

const onClick = () => {
  emit("clicked", "안녕하세요!"); // 부모에게 이벤트 + 데이터 보내기
};
</script>
