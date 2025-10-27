<script setup>
import MainComponent from './components/MainComponent.vue'
</script>

<template>
  <div id="app">
    <header class="app-header">
      <!-- <nav class="main-nav">
        <router-link to="/" class="nav-link">Подарки</router-link>
        <router-link to="/giftview/1" class="nav-link">Подарок</router-link>
        <div class="nav-decoration"></div>
      </nav> -->
    </header>
    
    <main class="app-content">
      <router-view />
    </main>
    
    <footer class="app-footer">

    </footer>
  </div>
</template>
<style scoped>

</style>
