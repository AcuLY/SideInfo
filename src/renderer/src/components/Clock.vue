<template>
    <div class="clock-wrapper">
        <div class="time-wrapper">
            <div id="time">{{ currentTime }}</div>
        </div>
        <div class="date-wrapper">
            <div id="date">{{ currentDate }}</div>
            <div id="day">{{ currentDay }}</div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const time = ref(new Date());

const currentDate = computed(() => {
    const year = time.value.getFullYear();
    const month = String(time.value.getMonth() + 1).padStart(2, '0');
    const date = String(time.value.getDate()).padStart(2, '0');
    return `${year}-${month}-${date}`;
});

const currentDay = computed(() => {
    const dayIndex = time.value.getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayIndex];
})

const currentTime = computed(() => {
    const hours = String(time.value.getHours()).padStart(2, '0');
    const minutes = String(time.value.getMinutes()).padStart(2, '0');
    const seconds = String(time.value.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
})

setInterval(() => {
    time.value = new Date();
}, 1000);
</script>

<style>
.clock-wrapper {
    width: 48vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-family: Garamond;
    box-sizing: border-box;
    padding: 10px 30px 10px 30px;
    user-select: none;
    color: white;
    text-shadow: 0 0 10px rgb(0, 0, 0);
}

.time-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

.date-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 0px 10px 0px 10px;
}

#time {
    font-size: 240px;
    transform: scaleY(1.35);
}

#date {
    font-size: 80px;
}

#day {
    font-size: 80px;
}
</style>