import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router.js'
import './assets/main.css' // Se till att dina CSS-filer är korrekt importerade
import './tailwind.css' // Importera Tailwind CSS
import 'flowbite' // Importera Flowbite
import AOS from 'aos'
import 'aos/dist/aos.css'

const app = createApp(App)
const pinia = createPinia()

// Använd plugin för persistenta tillstånd med Pinia
pinia.use(piniaPluginPersistedstate)

// Använd router och pinia med din Vue-applikation
app.use(router)
app.use(pinia)

// Initiera AOS när appen monteras
app.mount('#app')

app.config.globalProperties.$AOS = AOS
AOS.init()
