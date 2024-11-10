<template>
    <div class="weather-wrapper">
        <div class="location">
            <img src="../assets/weather-icon/LOCATION.png" alt="" style="width: 50px; margin-right: 10px;">
            <span>南京大学苏州校区</span>
        </div>
        <div class="current-container">
            <div id="current-temperature">{{ currentTemperature }}</div>
            <img :src="icon" alt="" id="weather-icon">
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

import Blizzard2 from '../assets/weather-icon/Blizzard2.png'
import ClearNight from '../assets/weather-icon/ClearNight.png'
import Dust from '../assets/weather-icon/Dust.png'
import Fog from '../assets/weather-icon/Fog.png'
import HeavyRain from '../assets/weather-icon/HeavyRain.png'
import HeavySnow2 from '../assets/weather-icon/HeavySnow2.png'
import LightRain from '../assets/weather-icon/LightRain.png'
import LightSnow2 from '../assets/weather-icon/LightSnow2.png'
import LOCATION from '../assets/weather-icon/LOCATION.png'
import ModerateRain from '../assets/weather-icon/ModerateRain.png'
import ModerateSnow2 from '../assets/weather-icon/ModerateSnow2.png'
import Overcast from '../assets/weather-icon/Overcast.png'
import ShowerRain2 from '../assets/weather-icon/ShowerRain2.png'
import Sleet2 from '../assets/weather-icon/Sleet2.png'
import SnowShower2 from '../assets/weather-icon/SnowShower2.png'
import Sunny from '../assets/weather-icon/Sunny.png'
import ThunderyRain from '../assets/weather-icon/ThunderyRain.png'
import TorrentialRain from '../assets/weather-icon/TorrentialRain.png'

const currentTemperature = ref(0);
const currentWeather = ref('');
const icon = ref(null);

const weatherForecast = ref([]);

const getWeather = async () => {
    const data = await window.api.fetchWeatherForecast();

    currentTemperature.value = `${data.current.temp_c.toFixed(0)}°`;
    currentWeather.value = icon_dict[data.current.condition.text];
    
    if (currentWeather.value === 'Blizzard2') icon.value = Blizzard2;
    else if (currentWeather.value === 'ClearNight') icon.value = ClearNight;
    else if (currentWeather.value === 'Dust') icon.value = Dust;
    else if (currentWeather.value === 'Fog') icon.value = Fog;
    else if (currentWeather.value === 'HeavyRain') icon.value = HeavyRain;
    else if (currentWeather.value === 'HeavySnow2') icon.value = HeavySnow2;
    else if (currentWeather.value === 'LightRain') icon.value = LightRain;
    else if (currentWeather.value === 'LightSnow2') icon.value = LightSnow2;
    else if (currentWeather.value === 'LOCATION') icon.value = LOCATION;
    else if (currentWeather.value === 'ModerateRain') icon.value = ModerateRain;
    else if (currentWeather.value === 'ModerateSnow2') icon.value = ModerateSnow2;
    else if (currentWeather.value === 'Overcast') icon.value = Overcast;
    else if (currentWeather.value === 'ShowerRain2') icon.value = ShowerRain2;
    else if (currentWeather.value === 'Sleet2') icon.value = Sleet2;
    else if (currentWeather.value === 'SnowShower2') icon.value = SnowShower2;
    else if (currentWeather.value === 'Sunny') icon.value = Sunny;
    else if (currentWeather.value === 'ThunderyRain') icon.value = ThunderyRain;
    else if (currentWeather.value === 'TorrentialRain') icon.value = TorrentialRain;

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

#weather-icon {
    filter: drop-shadow(0px 0px 5px rgb(0, 0, 0));
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