<template>
  <header class="header">
    <div class="logo">MyLogo</div>
    <nav class="nav">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Gallery</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  </header>
</template>

<script setup></script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
}
.logo {
  font-size: 24px;
  font-weight: bold;
}
.nav ul {
  display: flex;
  gap: 15px;
  list-style: none;
}
.nav a {
  text-decoration: none;
  color: #333;
}
@media (max-width: 768px) {
  .nav ul {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
