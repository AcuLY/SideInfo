<template>
    <div class="bangumi-wrapper">
        <div class="title">
            <div>今日放送</div>
            <div class="divider"></div>
        </div>
        
        <div class="anime-container">
            <div class="anime-list">
                <li v-for="anime in dailyAnime" :key="anime">{{ anime }}</li>
                <li v-for="anime in notCollectedAnime" :key="anime">{{ anime }}</li>
                <li v-for="anime in dailyAnime" :key="'copy-' + anime">{{ anime }}</li>
                <li v-for="anime in notCollectedAnime" :key="'copy-' + anime">{{ anime }}</li>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const ongoingAnime = ref([]);
const collectionAnime = ref([]);
const dailyAnime = ref([]);
const notCollectedAnime = ref([]);

const getBangumiCalendar = async () => {
    const day = new Date().getDay();
    try {
        const [calendarData, collectionData] = await window.api.fetchBangumiCalendar();

        ongoingAnime.value = calendarData[(day+6)%7].items.map(subject => subject.name);
        collectionAnime.value = collectionData.data.map(subject => subject.subject.name);

        dailyAnime.value = collectionAnime.value.filter(item => ongoingAnime.value.includes(item));
        notCollectedAnime.value = ongoingAnime.value.filter(item => !collectionAnime.value.includes(item));
    } catch(e) {
        console.log(e);
    }
}

setInterval(() => {
    const now = new Date();
    const hours = now.getHours();
    if (hours === 0) {
        getBangumiCalendar();
    }
}, 1800000);

onMounted(() => {
    getBangumiCalendar();
})
</script>

<style>
.bangumi-wrapper {
    width: 26vw;
    height: 100vh;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    font-family: STZhongsong;
    font-weight: 600;
    box-sizing: border-box;
    padding: 30px 30px 0px 0px;
    user-select: none;
    color: white;
}

.title {
    font-size: 60px;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.812);
    font-weight: 500;
}

.divider {
    height: 1px;
    width: 24vw;
    background-color: white;
    margin: 10px 0px 10px 0px;
}

.anime-container {
    width: 24vw;
    height: 64vh;
    overflow: hidden;
    white-space: nowrap;
}

.anime-list {
    font-size: 30px;
    animation: scroll 100s linear infinite;
    will-change: transform;
}

.anime-list li {
    width: 24vw;
    padding-left: 3px;
    margin-bottom: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    list-style: none;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.812);
}

.anime-list::-webkit-scrollbar {
    width: 0px;
    background: transparent;
}

@keyframes scroll {
    0% {
    transform: translateY(0);
    }
    100% {
    transform: translateY(-50%);
    }
}
</style>