<template>
  <nav class="fixed top-0 left-0 w-full z-20 bg-transparent">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="../assets/skovdebeachvolley_logo.png" class="h-20 w-20" alt="skovdebeach-logo" />
      </a>
      <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <span>
          <a
            v-if="!isLoggedIn"
            href="/login"
            class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-white md:p-0 md:dark:text-white"
            aria-current="page"
            >Logga in</a
          >
          <a
            v-else
            @click.prevent="logOut"
            href="#"
            class="block py-2 px-3 text-white bg-red-700 rounded md:bg-transparent md:text-white md:p-0 md:dark:text-white"
            aria-current="page"
            >Logga ut</a
          >
        </span>
        <button
          data-collapse-toggle="navbar-sticky"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-sticky"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      <div
        class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="navbar-sticky"
      >
        <ul
          class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700"
        >
          <!-- <li>
            <a
              href="/"
              class="nav-link block py-2 px-3 text-white md:bg-transparent md:text-white md:p-0 md:dark:text-white"
              aria-current="page"
              >Hem</a
            >
          </li> -->
          <li>
            <a href="/about" class="nav-link block py-2 px-3 text-white md:p-0 md:dark:text-white"
              >Om oss</a
            >
          </li>
          <li>
            <a
              href="/training"
              class="nav-link block py-2 px-3 text-white md:p-0 md:dark:text-white"
              >Träningsgrupper</a
            >
          </li>
          <li>
            <a href="/booking" class="nav-link block py-2 px-3 text-white md:p-0 md:dark:text-white"
              >Boka bana</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { useLoggedInStore } from '@/stores/loggedIn'
import { computed } from 'vue'

export default {
  name: 'NavBar',
  setup() {
    const loggedInStore = useLoggedInStore()
    const isLoggedIn = computed(() => loggedInStore.isLoggedIn)

    const logOut = () => {
      loggedInStore.logOut()
      console.log('utloggad')
    }

    return {
      isLoggedIn,
      logOut
    }
  }
}
</script>

<style>
nav {
  background-color: transparent; /* Transparent background */
}

.nav-link {
  position: relative;
  color: white; /* Always white text */
  text-decoration: none; /* Remove underline */
  transition: color 0.3s;
}

.nav-link:visited {
  color: white; /* Ensure visited links stay white */
}

.nav-link:hover,
.nav-link:focus {
  color: white; /* White color on hover and focus */
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  display: block;
  margin-top: 5px;
  right: 0;
  background: white;
  transition: width 0.3s ease;
  -webkit-transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link:focus::after {
  width: 100%;
  left: 0;
  background: white;
}

a:focus {
  outline: none; /* Remove default focus outline */
}
</style>
