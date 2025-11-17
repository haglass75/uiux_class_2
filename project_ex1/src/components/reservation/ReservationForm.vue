<template>
  <div class="card">
    <h2>1️⃣ 예약 선택</h2>
    <label>
      이름:
      <input v-model="name" placeholder="이름 입력" /> </label
    ><br />
    <label>
      날짜:
      <input type="date" v-model="date" /> </label
    ><br />
    <label>
      서비스:
      <select v-model="service">
        <option>짐 보관</option>
        <option>제빙기 청소</option>
      </select> </label
    ><br />
    <button class="btn btn--primary" @click="reserve">예약하기</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits(["next"]);

const name = ref("");
const date = ref("");
const service = ref("짐 보관");

const reserve = () => {
  emit("next", { name: name.value, date: date.value, service: service.value });
};
</script>

<style scoped lang="scss">

.card {
  display: flex;
  flex-direction: column;
}

</style>
