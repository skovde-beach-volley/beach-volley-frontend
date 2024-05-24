import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/HomePage.vue'
import Booking from './pages/BookingPage.vue'
import Contact from './pages/ContactPage.vue'
import LoginForm from './pages/LoginPage.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/booking', component: Booking },
  { path: '/contact', component: Contact },
  { path: '/login', component: LoginForm }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
