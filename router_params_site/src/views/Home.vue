<template>
  <h2>🏠 Home</h2>
  <div class="container">
    <div class="section">
      <h3>🛍 상품 페이지</h3>
      <router-link to="/product/1" class="btn">상품 1 보기</router-link><br />
      <router-link to="/product/2" class="btn">상품 2 보기</router-link><br />
    </div>
    <div class="section">
      <h3>👤 유저 페이지</h3>
      <router-link to="/user/kim" class="btn">kim 프로필</router-link><br />
      <router-link to="/user/sara" class="btn">sara 프로필</router-link><br />
    </div>
    <div class="section">
      <h3>📝 게시글 페이지</h3>
      <router-link to="/post/101" class="btn del">게시글 101 보기</router-link><br />
      <router-link to="/post/202" class="btn">게시글 202 보기</router-link>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "../assets/styles/btn.scss"; // 버튼 공통 스타일 불러오기
@import "../assets/styles/variables";

.container {
  padding: 20px;
  display: flex;
  gap: 20px;

  h3 {
    color: $main-color;
    margin-bottom: 20px;
  }

  .section {
    padding: 20px;
    background-color: rgb(253, 230, 255);
  }
}
</style>
