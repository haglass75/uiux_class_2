<script setup>

</script>

<template>
  <div>
    <!-- <h2>내 사이트</h2> -->
    <!-- 메뉴 -->
    <nav>
    <router-link to="/">홈</router-link> | 
    <router-link to="/about">소개</router-link> |
    <router-link to="/products">상품</router-link> |
    <router-link to="/cart">장바구니</router-link> 
  
  </nav>
    <!-- 페이지 보여주는 곳 -->
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
