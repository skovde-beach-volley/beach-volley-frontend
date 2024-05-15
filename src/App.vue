<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { RouterLink, RouterView } from 'vue-router'

export default {
  components: {
    Navbar,
    Footer
  }
}
</script>

<template>
  <body>
    <div class="app-container">
      <Navbar />
      <main>
        <RouterView />
      </main>
      <Footer />
    </div>
  </body>
</template>

<style>
/* .app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
} */

body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
main {
  flex: 1;
}
</style>
