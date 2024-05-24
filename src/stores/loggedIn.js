// // import { defineStore } from 'pinia'

// // export const useLoggedInStore = defineStore('loggedIn', {
// //   state: () => ({
// //     loggedIn: false
// //   }),
// //   actions: {
// //     logIn(username) {
// //       this.loggedIn = true
// //       this.username = username
// //       console.log('det här funkar faktiskt')
// //     },
// //     logOut() {
// //       this.loggedIn = false
// //       this.username = ''
// //       localStorage.setItem('loggedIn', 'false')
// //     }
// //   },
// //   getters: {
// //     isLoggedIn: (state) => state.loggedIn
// //   },
// //   persist: {
// //     enabled: true,
// //     strategies: [
// //       {
// //         key: 'loggedInStore',
// //         storage: localStorage
// //       }
// //     ]
// //   }
// // })

// // stores/loggedIn.js
// import { defineStore } from 'pinia'
// import { ref } from 'vue'

// export const useLoggedInStore = defineStore('loggedIn', () => {
//   const isLoggedIn = ref(false)
//   const username = ref('')

//   const logIn = (user) => {
//     isLoggedIn.value = true
//     localStorage.setItem('isLoggedIn', 'true')
//     username.value = user
//   }

//   const logOut = () => {
//     isLoggedIn.value = false
//     localStorage.removeItem('isLoggedIn')
//     localStorage.removeItem('username')
//     username.value = ''
//   }

//   return {
//     isLoggedIn,
//     username,
//     logIn,
//     logOut
//   }
// })

// stores/loggedIn.js
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
