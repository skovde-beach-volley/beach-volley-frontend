import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoggedInStore = defineStore('loggedIn', () => {
  const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true')
  const username = ref(localStorage.getItem('username') || '')

  const logIn = (user) => {
    isLoggedIn.value = true
    username.value = user
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('username', user)
  }

  const logOut = () => {
    isLoggedIn.value = false
    username.value = ''
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('username')
  }

  return {
    isLoggedIn,
    username,
    logIn,
    logOut
  }
})
