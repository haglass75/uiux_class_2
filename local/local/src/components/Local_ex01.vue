<template>
  <div>
    <!-- localStorage 로컬스토리지 -->
    <div class="box">
      <h2>짐보관 예약</h2>
      <input v-model="name" type="text" placeholder="이름을 입력하세요" /><br />
      <button @click="saveName">💾 저장하기</button>
      <button @click="loadName">📂 불러오기</button>
      <button @click="clearName">🗑️ 지우기</button>
      <p>저장된 이름 : {{ savedName }}</p>
    </div>
  </div>
</template>
<script setup>
import { ref ,onMounted} from "vue";
const name = ref("");
// 저장된 이름 보여주기
const savedName = ref("");
// 저장하기
const saveName = () => {
  localStorage.setItem("customerName", name.value);

  alert("이름이 저장됐어요~");
  savedName.value = name.value; // 저장후 화면 반영
};
// 불러오기
const loadName = () => {
  const getName = localStorage.getItem("customerName");
  console.log(getName);
  savedName.value = getName ? getName : "저장된 이름이 없어요."
};
// 지우기
const clearName = ()=>{
    localStorage.removeItem("customerName")
    savedName.value = ""
    alert("저장된 이름이 지워졌어요!")
}
// 페이지 열릴때 자동으로 불러오기
onMounted(() => {
// const getName = localStorage.getItem("customerName")
// if(getName){
//     savedName.value = getName
// }else{
//      savedName.value = "저장된 이름이 없어요."
// }
loadName() 
})
</script>

<style scoped></style>
