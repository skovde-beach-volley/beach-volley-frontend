<script>
export default {
  name: 'InfoPage'
}
</script>
<template>
  <div class="info-page">
    <header class="header">
      <div class="header-content">
        <h1 class="header-text">Träna beachvolleyboll i Skövde</h1>
      </div>
    </header>
    <div class="content">
      <div class="text-section">
        <div>
          <h2 class="text-2xl font-bold mb-2">Ungdom</h2>
          <p class="text-lg">Rekommenderad ålder 10-15 år. Inga förkunskaper krävs.</p>
          <p class="text-lg mb-10"><strong>Tider:</strong> Tisdag 17.30-19.00</p>
        </div>
        <div>
          <h2 class="text-2xl font-bold mb-2">Dam 1 / Herr 1</h2>
          <p class="text-lg">För dig som vill lära dig grunderna i teknik/spel i beachvolley.</p>
          <p class="text-lg mb-10"><strong>Tider:</strong> Torsdag 17.30-19.00</p>
        </div>
        <div>
          <h2 class="text-2xl font-bold mb-2">Dam 2 / Herr 2</h2>
          <p class="text-lg">
            För dig som har tränat beachvolleyboll i klubb ett tag och är med i tävlingar som ger
            rankingpoäng.
          </p>
          <p class="text-lg"><strong>Tider Dam 2:</strong> Torsdag 19.00-20.30</p>
          <p class="text-lg mb-10"><strong>Tider Herr 2:</strong> Tisdagar 19.00-20.30</p>
          <p class="text-lg mb-10">
            Träningar pågår vecka 20-33 med semesteruppehåll v 29 & 30. Samtliga träningar är
            tränarledda och det finns 8 platser på varje bana.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  position: relative;
  background-image: url('../assets/group.jpg');
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
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
}

h2 {
  color: #2c3e50;
}

p {
  font-size: 1rem;
  color: #2c3e50;
  line-height: 1.6;
}
</style>
