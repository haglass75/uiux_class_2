<template>
  <div class="weather-card">
    <!-- <h2 class="title">🌤️ 현재 날씨</h2> -->

    <!-- 로딩 중 -->
    <div v-if="loading">⏳ 불러오는 중...</div>

    <!-- 오류 -->
    <div v-else-if="error">{{ error }}</div>

    <!-- 성공 -->
    <div v-else class="weather-info">
      <img
        :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
        :alt="weather.weather[0].description"
        class="weather-icon" />
      <p class="temp">{{ weather.main.temp.toFixed(1) }}°C</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const weather = ref(null);
const loading = ref(true);
const error = ref("");

const city = "Seoul";
const apiKey = "a754a578a90e341975a4bb1d13a32e63"; // 꼭 수정하세요!

const getWeather = async () => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=kr`;
    const res = await fetch(url);

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "날씨 데이터를 가져올 수 없습니다.");
    }

    const data = await res.json();
    weather.value = data;
  } catch (err) {
    error.value = `❌ 오류: ${err.message}`;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getWeather();
});
</script>

<style scoped>
.weather-card {
  /* background: linear-gradient(135deg, #93c5fd, #bfdbfe); */
  border-radius: 1rem;
  text-align: center;
  /* width: 180px; */
  /* margin: 50px auto; */
  /* padding: 20px; */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.weather-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.weather-icon {
  width: 50px;
  height: 50px;
}

.temp {
  font-size: 1rem;
  font-weight: bold;
  color: #1e3a8a;
}
</style>
