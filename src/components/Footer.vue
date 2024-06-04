<template>
  <footer class="bg-transparent rounded-lg shadow dark:bg-gray-900 m-4 border-none">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
      <div class="sm:flex sm:items-center sm:justify-between">
        <a
          href="https://flowbite.com/"
          class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
        >
          <img
            src="../assets/skovdebeachvolley_logo.png"
            class="h-16 w-16"
            alt="Skovdebeachvolley"
          />
        </a>
        <ul
          class="flex justify-center items-start flex-wrap mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400"
        >
          <li class="me-4 md:me-6">
            <a href="#" class="hover:underline">Kontakt</a>
            <p class="hover:underline text-sm">skovdebeachvolley@gmail.com</p>
          </li>
          <li class="follow-us me-4 md:me-6">
            <!-- <a href="#" class="hover:underline">Följ oss</a> -->
            <img src="../assets/facebook.png" class="mr-5 h-12 w-12" alt="Skovdebeachvolley" />
            <img src="../assets/instagram.png" class="h-12 w-12" alt="Skovdebeachvolley" />
          </li>
        </ul>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400"
        >© 2024
        <p class="hover:underline">Skövde beachvolley™</p>
        . All Rights Reserved.</span
      >
    </div>
  </footer>
</template>

<style scoped>
ul {
  align-items: flex-start;
}

.follow-us {
  display: flex;
  flex-direction: row;
}
</style>
