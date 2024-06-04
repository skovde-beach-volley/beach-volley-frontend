<script>
import { useLoggedInStore } from '@/stores/loggedIn'
import { computed, ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'NavBar',
  setup() {
    const loggedInStore = useLoggedInStore()
    const isLoggedIn = computed(() => loggedInStore.isLoggedIn)
    const menuOpen = ref(false)
    const isScrolled = ref(false)

    const logOut = () => {
      loggedInStore.logOut()
      console.log('utloggad')
    }

    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value
    }

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 0
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      isLoggedIn,
      logOut,
      menuOpen,
      toggleMenu,
      isScrolled
    }
  }
}
</script>

<template>
  <nav
    :class="{ 'bg-dark': isScrolled, 'bg-transparent': !isScrolled }"
    class="fixed top-0 left-0 w-full z-20 transition-colors duration-300"
  >
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a class="flex items-center space-x-3 rtl:space-x-reverse">
        <RouterLink to="/">
          <img
            src="../assets/skovdebeachvolley_logo.png"
            class="h-20 w-16"
            alt="skovdebeach-logo"
          />
        </RouterLink>
      </a>

      <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <span>
          <RouterLink
            v-if="!isLoggedIn"
            to="/login"
            class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-white md:p-0 md:dark:text-white"
            aria-current="page"
          >
            Logga in</RouterLink
          >
          <RouterLink
            v-else
            @click.prevent="logOut"
            to="#"
            class="block py-2 px-3 text-white bg-red-700 rounded md:bg-transparent md:text-white md:p-0 md:dark:text-white"
            aria-current="page"
            >Logga ut</RouterLink
          >
        </span>
        <button
          @click="toggleMenu"
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
        :class="{ hidden: !menuOpen, block: menuOpen }"
        class="items-center justify-between w-full md:flex md:w-auto md:order-1"
        id="navbar-sticky"
      >
        <ul
          :class="menuOpen ? 'bg-white text-black' : 'bg-gray-50 text-white'"
          class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700"
        >
          <li>
            <a
              href="/about"
              class="nav-link block py-2 px-3 md:p-0"
              :class="{ 'text-black': menuOpen, 'text-white': !menuOpen }"
            >
              Om oss
            </a>
          </li>
          <li>
            <a
              href="/training"
              class="nav-link block py-2 px-3 md:p-0"
              :class="{ 'text-black': menuOpen, 'text-white': !menuOpen }"
            >
              Träningsgrupper
            </a>
          </li>
          <li>
            <a
              href="/booking"
              class="nav-link block py-2 px-3 md:p-0"
              :class="{ 'text-black': menuOpen, 'text-white': !menuOpen }"
            >
              Boka volleybollplan
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style>
nav.bg-dark {
  background-color: rgba(0, 0, 0, 0.5); /* Mörk bakgrundsfärg */
}

nav.bg-transparent {
  background-color: transparent; /* Transparent bakgrund */
}

.nav-link {
  position: relative;
  text-decoration: none; /* Ta bort understrykning */
  transition: color 0.3s;
}

.nav-link:visited {
  color: inherit; /* Se till att besökta länkar ärvs färg */
}

.nav-link:hover,
.nav-link:focus {
  color: inherit; /* Ärvs färg vid hover och focus */
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  display: block;
  margin-top: 5px;
  right: 0;
  background: currentColor;
  transition: width 0.3s ease;
  -webkit-transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link:focus::after {
  width: 100%;
  left: 0;
  background: currentColor;
}

a:focus {
  outline: none; /* Ta bort standard focus outline */
}
</style>
