<template>
  <div class="card">
    <h2>3️⃣ 예약 확인</h2>
    <p>✅ {{ reservation.name }}님 예약이 완료되었습니다.</p>
    <p>날짜: {{ reservation.date }}</p>
    <p>서비스: {{ reservation.service }}</p>
    <p>결제금액: {{ reservation.price }}원</p>
    <p>상태: {{ reservation.status }}</p>
    <button class="btn btn--danger">취소하기</button>
  </div>
</template>

<script setup>
const props = defineProps({
  reservation: { type: Object, required: true }
})
</script>

<style scoped lang="scss">

</style>
