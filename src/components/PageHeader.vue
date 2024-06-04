<script>
export default {
  name: 'PageHeader'
}
</script>

<template>
  <header class="header">
    <div class="header-content">
      <div data-aos="fade-up">
        <h1 class="header-text p-10">Skövde Beachvolley</h1>
      </div>
      <RouterLink to="/booking">
        <button
          class="button-font text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-2xl w-58 text-center p-5"
        >
          Boka beachvolleybollplan!
        </button>
      </RouterLink>
    </div>
  </header>
</template>

<style>
.header {
  position: relative;
  background-image: url(../assets/images/side-view.jpg);
  background-size: cover;
  background-position: center;
  height: 70vh;
  width: 100%;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.header-content {
  position: relative;
  z-index: 2;
  text-align: center;
  margin-bottom: 40px;
}

.button-font {
  font-family: 'Pacifico', cursive;
}

.header h1 {
  font-size: 80px;
  color: #faf2e9;
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  margin: 0;
}

.header-button {
  margin-top: 20px;
  padding: 16px 32px;
  font-size: 30px;
  width: 300px;
  height: 100px;
  z-index: 3;
}
</style>
