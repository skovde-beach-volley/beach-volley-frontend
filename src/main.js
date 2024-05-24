import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router.js'
import './assets/main.css' // Ensure your CSS files are correctly imported
import './tailwind.css' // Import Tailwind CSS
import 'flowbite' // Import Flowbite

const app = createApp(App)
const pinia = createPinia()

// Use the persisted state plugin with Pinia
pinia.use(piniaPluginPersistedstate)

// Use the router and pinia with your Vue application
app.use(router)
app.use(pinia)

// Mount the Vue application to the DOM
app.mount('#app')
