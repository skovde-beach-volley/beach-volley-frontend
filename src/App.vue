<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { RouterLink, RouterView } from 'vue-router'

export default {
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      loggedIn: false // Ange den initiala inloggningsstatusen här
    }
  }
}
</script>

<template>
  <body>
    <div class="app-container">
      <Navbar :loggedIn="loggedIn" />
      <main>
        <RouterView />
      </main>
      <Footer />
    </div>
  </body>
</template>

<style>
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
