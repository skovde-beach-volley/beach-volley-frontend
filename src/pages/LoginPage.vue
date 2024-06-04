<script>
import { ref, computed } from 'vue'
import { useLoggedInStore } from '@/stores/loggedIn'

export default {
  name: 'LoginPage',
  setup() {
    const loggedInStore = useLoggedInStore()
    const username = ref('')
    const password = ref('')
    const errorMessage = ref('')

    const isLoggedIn = computed(() => loggedInStore.isLoggedIn)
    const userMessage = computed(() => `Du är nu inloggad ${username.value}`)

    const login = () => {
      const account = { username: 'sanna.asp@hotmail.com', password: 'sannis' }
      if (username.value !== account.username || password.value !== account.password) {
        errorMessage.value = 'Felaktigt användarnamn eller lösenord'
        loggedInStore.logOut()
        return
      }
      loggedInStore.logIn(username.value)
      errorMessage.value = ''
      console.log('inloggad')
    }

    const logout = () => {
      loggedInStore.logOut()
      username.value = ''
      password.value = ''
      console.log('jag är utloggad')
    }

    return {
      username,
      password,
      isLoggedIn,
      userMessage,
      login,
      logout,
      errorMessage
    }
  }
}
</script>

<template>
  <header class="header">
    <div class="header-content">
      <h1 class="header-text">Logga in/Skapa konto</h1>
    </div>
  </header>
  <div class="info-page shiny-background">
    <div class="content">
      <div class="text-section">
        <h2 class="text-4xl mb-10 text-left">Logga in</h2>
        <input class="login-input" type="text" v-model="username" placeholder="Användarnamn" />
        <input class="login-input" type="password" v-model="password" placeholder="Lösenord" />
        <div class="button-container">
          <button
            v-if="!isLoggedIn"
            @click="login"
            type="button"
            class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm w-32 px-3 py-2 text-center mb-2"
          >
            Logga in
          </button>

          <button
            v-else
            class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm w-32 px-3 py-2 text-center mb-2"
            @click="logout"
          >
            Logga ut
          </button>
        </div>
        <div class="button-container">
          <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
          <span v-if="isLoggedIn && username">{{ userMessage }}</span>
          <p v-else>Du är nu utloggad</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  position: relative;
  background-image: url('../assets/playing.jpg');
  background-position: center; /* Centrera bilden */
  background-size: cover;
  background-position: center;
  height: 50vh;
  width: 100%;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}
.info-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  /* background-color: #8bb8e2; */
  background-size: 400% 400%;
  /* animation: shiny 3s forwards; */
  color: #333;
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch; /* Ensures children take up the full height */
  /* background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); */
  overflow: hidden;
  width: 80%;
  max-width: 1200px;
}

.login-box {
  display: flex;
  justify-content: center;
}

.login-container {
  width: 300px;
  height: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  margin-top: 30px;
}

.login-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-bottom: 2px solid #ccc;
  background-color: transparent;
  transition: border-bottom-color 0.3s;
  outline: none;
}

.login-input:focus {
  border-bottom-color: #c143ae;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #c143ae;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #c143ae;
}

.error-message {
  color: #ff0000;
  margin-bottom: 10px;
  text-align: center;
}
</style>
