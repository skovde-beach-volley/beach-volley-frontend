<script>
export default {
  name: 'InfoPage'
}
</script>
<template>
  <div class="info-page">
    <header class="header">
      <div class="header-content">
        <h1 class="header-text">Om Beachvolley Skövde</h1>
      </div>
    </header>
    <div class="content">
      <div class="text-section">
        <h2 class="text-3xl mb-4">Om Beachvolley Skövde</h2>
        <p class="text-lg text-gray-700 mb-4">
          Beachvolleyboll är en populär sport i Skövde som lockar både nybörjare och erfarna
          spelare. Föreningen erbjuder träningsgrupper och tävlingar för alla nivåer. Kom och upplev
          gemenskapen och glädjen i beachvolleyboll!
        </p>
        <p class="text-lg text-gray-700 mb-4">
          Vi spelar i Karstorp i Skövde, en fantastisk plats där du kan njuta av sporten och naturen
          samtidigt. Vår förening är inbjudande och välkomnar spelare i alla åldrar och nivåer.
        </p>
        <p class="text-lg text-gray-700">
          Vi är glada att meddela att vi kommer att bygga ut nya planer till sommaren 2025. Detta
          kommer att ge ännu fler möjligheter för spel och träning, och vi ser fram emot att
          välkomna ännu fler entusiastiska spelare till våra banor. Håll utkik efter mer information
          och kom och delta i gemenskapen!
        </p>
      </div>
      <div class="image-section">
        <img src="../assets/images/front-view-female.jpg" alt="Beachvolleyboll i Skövde" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  position: relative;
  background-image: url('../assets/images/playing.jpg');
  background-position: center;
  background-size: cover;
  background-position: center;
  height: 50vh;
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
  margin-bottom: 20px;
}

.header h1 {
  font-size: 4rem;
  color: #faf2e9;
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  margin: 0;
}

.info-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #faf2e9;
}

.content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 80%;
  max-width: 1200px;
  margin-top: 20px;
  margin-bottom: 40px;
  padding: 20px;
}

.text-section {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.image-section {
  flex: 1;
  display: flex;
}

.image-section img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

h1,
h2 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
}

p {
  font-size: 1rem;
  color: #2c3e50;
  line-height: 1.6;
}
</style>
