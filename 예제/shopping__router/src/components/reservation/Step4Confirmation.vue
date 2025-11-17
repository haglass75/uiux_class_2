<template>
  <div class="step-container">
    <h3>예약 완료</h3>
    <p>결제가 정상적으로 완료되었습니다.</p>
    <p class="summary">
      출발지: {{ resevationData.departure }} → 도착지 :{{
        resevationData.destination
      }}
    </p>
    <p>예약자 : {{ resevationData.name }} - ({{ resevationData.phone }})</p>
    <p>짐개수: {{ resevationData.luggageCount }}</p>
    <div class="btn-group">
      <button @click="prevStep">이전</button>
      <button @click="goHome">홈으로 이동</button>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const emit = defineEmits(["next", "prev"]);
defineProps({ resevationData: Object });
const prevStep = () => emit("prev");
const goHome = () => {
  router.push("/");
};
</script>
<style scoped>
.step-container {
  text-align: center;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
p {
  line-height: 2;
}
.step-container {
  text-align: left;
}
.agreement {
  margin: 15px 0;
  font-size: 14px;
}

.btn-group {
  display: flex;
  gap: 10px;
  justify-content: center;
}
</style>
