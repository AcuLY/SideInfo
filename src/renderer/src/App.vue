<template>
  <div id="wrapper">
    <div style="position: absolute; width: 100vw; height: 100vh; overflow: hidden;">
      <img src="./assets/IMG_7982.JPG" alt="" style="position: absolute; width: 100vw; -webkit-user-drag: none; transform: translateY(-180px);">
    </div>
    
    <Weather style="z-index: 1;"/>
    <Clock id="clock" style="z-index: 1;"/>
    <Bangumi style="z-index: 1;"/>
  </div>
</template>

<script setup>
import Clock from './components/Clock.vue'
import Bangumi from './components/Bangumi.vue'
import Weather from './components/Weather.vue'
</script>

<style scoped>
#wrapper {
  display: flex;
  justify-content: center;
}
</style>