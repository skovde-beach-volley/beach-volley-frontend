import { createRouter, createWebHistory } from 'vue-router'
import AboutPage from './pages/AboutPage.vue'
import HomePage from './pages/HomePage.vue'
import Booking from './pages/BookingPage.vue'
import Training from './pages/TrainingPage.vue'
import LoginForm from './pages/LoginPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage },
  { path: '/booking', component: Booking },
  { path: '/training', component: Training },
  { path: '/login', component: LoginForm }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
