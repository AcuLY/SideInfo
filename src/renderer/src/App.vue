<template>
  <div id="wrapper">
    <div style="position: absolute; width: 100vw; height: 100vh; overflow: hidden;">
      <img src="./assets/texture-rain-bg.png" alt="" style="position: absolute; width: 100vw; -webkit-user-drag: none; transform: translateY(-300px);">
    </div>

    <Clock id="clock" style="z-index: 1;"/>
  </div>
</template>

<script setup>
import Clock from './components/Clock.vue'
</script>

<style scoped>
#wrapper {
  display: flex;
  justify-content: center;
}
</style>