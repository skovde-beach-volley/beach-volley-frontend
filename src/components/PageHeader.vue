<script>
export default {
  name: 'PageHeader'
}
</script>

<template>
  <header class="header">
    <div class="header-content">
      <h1 class="header-text">Skövde Beachvolley</h1>
      <a href="/booking">
        <button
          class="header-button text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-lg text-center mb-2"
        >
          Boka & spela Beachvolleyboll!
        </button>
      </a>
    </div>
  </header>
</template>

<style>
.header {
  position: relative;
  background-image: url(../assets/side-view.jpg);
  background-size: cover;
  background-position: center;
  height: 70vh;
  width: 100%;
  background-repeat: no-repeat;
  display: flex;
  align-items: flex-end;
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

.header h1 {
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-size: 120px;
  font-family: 'Great Vibes', cursive;
  margin: 0;
}

.header-button {
  margin-top: 20px;
  padding: 16px 32px; /* Larger padding for a bigger button */
  font-size: 30px; /* Larger font size */
  width: 300px; /* Larger width */
  height: 100px; /* Larger height */
  z-index: 3;
}
</style>
