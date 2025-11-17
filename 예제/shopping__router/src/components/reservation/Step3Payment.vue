<template>
  <div class="step-container">
    <h3>결제하기</h3>
    <p class="summary">
      출발지: {{ resevationData.departure }} → 도착지 :{{
        resevationData.destination
      }}
    </p>
    <p>예약자 : {{ resevationData.name }} - ({{ resevationData.phone }})</p>
    <p>짐개수: {{ resevationData.luggageCount }}</p>
    <div class="agreement">
      <input type="checkbox" v-model="agree" /><label>동의합니다.</label>
    </div>
    <div class="btn-group">
      <button @click="prevStep">이전</button>
      <button @click="confirmPayment" :disabled="!agree">결제</button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const emit = defineEmits(["next", "prev"]);
defineProps({ resevationData: Object });
const agree = ref(false);
const prevStep = () => emit("prev");
const confirmPayment = () => emit("next", { paymentComfirmed: true });
</script>

<style scoped>
.step-container {
  text-align: center;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

p{
  line-height: 2;
}
.step-container{
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