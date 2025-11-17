<script setup>
import { computed, ref } from "vue";
import Step1Departure from "@/components/reservation/Step1Departure.vue";
import Step2Info from "@/components/reservation/Step2Info.vue";
import Step3Payment from "@/components/reservation/Step3Payment.vue";
import Step4Confirmation from "@/components/reservation/Step4Confirmation.vue";

// 현재 단계
const currentStep = ref(1);
const steps = [Step1Departure, Step2Info, Step3Payment, Step4Confirmation];
// 현재 표시할 컴포넌트
const currentStepComponent = computed(() => steps[currentStep.value - 1]);
// 예약 진행 데이터 (출발지 도착지 예약 정보 )
const resevationData = ref({
  departure: "", //출발지 정보
  destination: "", //도착지 정보
  name: "", //예약자 이름
  phone: "", //예약자 전화번호
  luggageCount: 1, // 짐개수
  paymentComfirmed: false,
});
// 다음 버튼 클릭시 다음 단계 이동
const goToNextStep = (data) => {
  console.log(data);
  // 기존 데이터에 새 데이터 병합
  resevationData.value = { ...resevationData.value, ...data };
  console.log("다음단계로 이동", resevationData.value);

  if (currentStep.value < steps.length) currentStep.value++;
};
// 이전버튼
const goToPrevStep = () => {
  if (currentStep.value > 1) currentStep.value--;
};
</script>

<template>
  <div class="wrap">
    <main>
      <div class="reservation-container">
        <h2>짐 보관 & 배송 예약</h2>
        <component
          :is="currentStepComponent"
          @next="goToNextStep"
          @prev="goToPrevStep"
          :resevationData="resevationData" />
      </div>
    </main>
  </div>
</template>

<style scoped>
.reservation-container {
  max-width: 600px;
  margin: auto;
  text-align: center;
}
</style>
