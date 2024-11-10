<template>
    <div class="weather-wrapper">
        <div class="location">
            <img src="../assets/weather-icon/LOCATION.png" alt="" style="width: 50px; margin-right: 10px;">
            <span>南京大学苏州校区</span>
        </div>
        <div class="current-container">
            <div id="current-temperature">{{ currentTemperature }}</div>
            <img :src="`./src/assets/weather-icon/${currentWeather}.png`" alt="">
        </div>
        <div class="forecast-container">
            <div class="forecast" v-for="(item, index) in weatherForecast" :key="index">
                <div>{{ item.day }}</div>
                <div style="font-family: garamond;">{{ item.temperature }}</div>
                <div>{{ item.condition }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { weather_dict, icon_dict } from '../weather_dict';

const currentTemperature = ref(0);
const currentWeather = ref('');

const weatherForecast = ref([]);

const getWeather = async () => {
    const data = await window.api.fetchWeatherForecast();

    currentTemperature.value = `${data.current.temp_c.toFixed(0)}°`;
    currentWeather.value = icon_dict[data.current.condition.text];

    const dayIndex = new Date().getDay();
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    weatherForecast.value = data.forecast.forecastday.map((item, index) => ({
        day: days[(dayIndex + index) % 7],
        temperature: `${(item.day.mintemp_c).toFixed(0)}°~${(item.day.maxtemp_c).toFixed(0)}°`,
        condition: weather_dict[(item.day.condition.text).trim()]
    }));
}

setInterval(() => {
    const now = new Date();
    const minutes = now.getMinutes();
    if (minutes === 0) {
        getWeather();
    }
}, 60000);

onMounted(() => {
    getWeather();
});
</script>

<style scoped>
.weather-wrapper {
    width: 26vw;
    height: 100vh;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    font-family: STZhongsong;
    font-weight: 500;
    box-sizing: border-box;
    padding: 30px 0px 10px 30px;
    user-select: none;
    color: white;
    text-shadow: 0 0 10px rgb(0, 0, 0);
}

.location {
    display: flex;
    align-items: center;
    font-size: 40px;
}

.current-container {
    width: 24vw;
    height: 40vh;
    margin: 20px 0 10px 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

#current-temperature {
    font-size: 160px;
    font-family: garamond;
}

#current-weather {
    font-size: 60px;
}

.forecast-container {
    width: 24vw;
    display: flex;
    justify-content: space-between;
    font-size: 32px;
}

.forecast {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
</style>