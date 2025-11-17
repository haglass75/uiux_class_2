<template>
  <div class="form_wrap">
    <div>
      <h2>🙂 이름 입력</h2>
      <form>
        <!-- <input @input="nameInput" placeholder="이름 입력" /> -->
        <input v-model="name" placeholder="이름 입력" />
        <button type="submit">제출</button>
      </form>
      <p>내 이름은 👉 {{ name }}</p>
      <form @submit.prevent="handleSubmit">
        <input v-model="email" placeholder="이메일 입력" />
        <button type="submit">제출</button>
      </form>
    </div>
    <div>
      <h2>🔑 로그인 폼</h2>
      <form @submit.prevent="login">
        <input v-model="userId" placeholder="아이디 입력" />
        <input v-model="password" type="password" placeholder="비밀번호 입력" />
        <button type="submit">로그인</button>
      </form>
      <p>아이디: {{ userId }}</p>
      <p>비밀번호: {{ password }}</p>
    </div>
    <div>
      <h2>✅ 체크박스 & 옵션 선택</h2>
      <form @submit.prevent="reserve">
        <label>
          <input type="checkbox" v-model="agree" />
          이용약관 동의
        </label>

        <select v-model="product">
          <option>사과</option>
          <option>바나나</option>
          <option>포도</option>
        </select>

        <button type="submit">예약하기</button>
      </form>

      <p>약관 동의: {{ agree }}</p>
      <p>선택한 상품: {{ product }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const name = ref(""); // 입력된 이름 저장const email = ref("");
const nameInput = (e) => {
  name.value = e.target.value;
};
const email = ref("");
const handleSubmit = () => {
  alert(`제출 완료! 입력한 이메일: ${email.value}`);
};
// ✅ 4단계: 여러 입력 다루기 (아이디 + 비밀번호)
const userId = ref("");
const password = ref("");

const login = () => {
  alert(`로그인 시도! 아이디: ${userId.value}, 비번: ${password.value}`);
};
// ✅ 5단계: 체크박스 & 셀렉트 박스
const agree = ref(false);
const product = ref("사과");

const reserve = () => {
  alert(`상품: ${product.value}, 약관 동의: ${agree.value}`);
};
</script>
<style scoped>
.form_wrap {
  display: flex;
  gap: 20px;
}
.form_wrap > div {
  flex: 1;
  background-color: rgb(199, 213, 226);
  padding: 10px;
}
</style>
