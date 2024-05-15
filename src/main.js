import './assets/main.css'
import router from './router.js'
import { createApp } from 'vue'
import 'tailwindcss/tailwind.css'

import App from './App.vue'

const app = createApp(App)
app.use(router)
app.mount('#app')
