<script>
import { useLoggedInStore } from '@/stores/loggedIn'

export default {
  setup() {
    const loggedInStore = useCounterStore()

    const logIn = () => {
      counterStore.logIn()
    }

    const logOut = () => {
      counterStore.logOut()
    }

    return {
      logIn,
      logOut
    }
  }
}
export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      // loggedIn: false,
      loggedIn: localStorage.getItem('loggedIn') === 'true'
    }
  },
  methods: {
    login() {
      const accounts = [{ username: 'sanna.asp@hotmail.com', password: 'sannis' }]

      const account = accounts.find((acc) => acc.username == this.username)

      if (!account || account.password !== this.password) {
        this.errorMessage = 'Felaktigt användarnamn eller lösenord'
        this.loggedIn = false
        localStorage.removeItem('loggedIn')
        return
      }
      this.loggedIn = true
      localStorage.setItem('loggedIn', 'true')

      console.log('Du är inloggad', this.username)
    }
  }
}
</script>

<template>
  <div class="login-container">
    <input class="login-input" type="text" v-model="username" placeholder="Användarnamn" />
    <input class="login-input" type="password" v-model="password" placeholder="Lösenord" />
    <button class="login-button" @click="login">Logga in</button>
    <p class="error-message" v-if="!loggedIn">Fel användarnamn eller lösenord</p>
    <p v-if="loggedIn">Du är nu inloggad {{ this.username }}</p>
  </div>
</template>

<style scoped>
/* Style för inloggningssidan */

.login-container {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
}

.login-form {
  margin-bottom: 20px;
}

.login-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #0056b3;
}

.error-message {
  color: #ff0000;
  margin-bottom: 10px;
  text-align: center;
}
</style>
