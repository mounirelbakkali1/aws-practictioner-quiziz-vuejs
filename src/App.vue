<script setup>
import NavBar from './components/NavBar.vue'
import Main from './components/MainComponent.vue'
let customTitle = ' Cloud Practitioner '
</script>

<template>
  <header>
    <NavBar :customTitle="customTitle" />
  </header>
  <main>
    <Main />
  </main>

  <!-- <footer>
    <ParentTest />
  </footer> -->
</template>

<style scoped>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}
</style>
