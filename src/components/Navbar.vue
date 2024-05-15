<template>
  <nav class="navbar-container">
    <div class="navbar-logo">
      <a href="#">
        <img src="@/assets/skovdebeachvolley_logo.png" alt="Logo" width="70" height="70" />
      </a>
    </div>
    <ul class="navbar-menu">
      <li class="navbar-item"><router-link to="/">Hem</router-link></li>
      <li class="navbar-item"><router-link to="/about">Om oss</router-link></li>
      <li class="navbar-item"><router-link to="/booking">Boka bana</router-link></li>
      <li class="navbar-item"><router-link to="/contact">Kontakt</router-link></li>
    </ul>
    <span class="navbar-menu"><p>Logga in/medlemskap</p></span>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' }
]

const mobileMenuOpen = ref(false)
</script>

<style scoped>
.navbar-menu {
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-content: center;
  list-style-type: none;
  align-items: center;
}

.navbar-item {
  margin: 0 1rem;
}
.navbar-container {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-right: 50px;
  margin-left: 50px;
}

/* .navbar-logo {
  margin-right: auto;
} */
</style>
