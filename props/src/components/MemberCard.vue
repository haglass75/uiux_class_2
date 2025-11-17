<template>
  <div class="card">
    <h2>{{ member.name }}님</h2>
    <p>나이: {{ member.age }}살</p>
    <p>이메일: {{ member.email }}</p>
    <p v-if="member.vip">⭐ VIP 회원</p>
    <p v-else>일반 회원</p>
  </div>
</template>

<script setup>
const props = defineProps({
  member: {
    type: Object,
    required: true, // 반드시 부모가 값을 전달해야 함
    default: () => ({ name: "손님", age: 0, email: "없음", vip: false }),
  },
});
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  padding: 15px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}
h2 {
  color: #333;
}
p {
  margin: 5px 0;
}
</style>
