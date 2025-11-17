<template>
  <div>
    <h2>🔔 알림창 (모달)</h2>

    <!-- 버튼 -->
    <button @click="showModal = true">알림창 열기</button>

    <!-- 모달창 -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h3>📢 안내</h3>
        <p>정말로 진행하시겠습니까?</p>
        <button @click="showModal = false">닫기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 모달창 보이기/숨기기
const showModal = ref(false);
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 어두운 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 250px;
}
</style>
