<template>
  <div class="info-page">
    <div class="content">
      <div class="text-section">
        <h1 class="text-3xl">Kom och träna Beachvolleyboll i Skövde</h1>
        <div>
          <div>
            <h2 class="text-2xl font-bold mb-2">Ungdom</h2>
            <p class="text-lg">Rekommenderad ålder 10-15 år. Inga förkunskaper krävs.</p>
            <p class="text-lg"><strong>Tider:</strong> Tisdag 17.30-19.00</p>
            <p class="text-lg">
              Träningar pågår vecka 20-33 med semesteruppehåll v 29 & 30. Samtliga träningar är
              tränarledda och det finns 8 platser på varje bana.
            </p>
          </div>
        </div>
        <div>
          <h2 class="text-2xl font-bold mb-2">Dam 1 / Herr 1</h2>
          <p class="text-lg">För dig som vill lära dig grunderna i teknik/spel i beachvolley.</p>
          <p class="text-lg"><strong>Tider:</strong> Torsdag 17.30-19.00</p>
        </div>
        <div>
          <h2 class="text-2xl font-bold mb-2">Dam 2 / Herr 2</h2>
          <p class="text-lg">
            För dig som har tränat beachvolleyboll i klubb ett tag och är med i tävlingar som ger
            rankingpoäng.
          </p>
          <p class="text-lg"><strong>Tider Dam 2:</strong> Torsdag 19.00-20.30</p>
          <p class="text-lg"><strong>Tider Herr 2:</strong> Tisdagar 19.00-20.30</p>
        </div>
      </div>
      <div class="image-section">
        <img src="../assets/group.jpg" alt="Beachvolleyboll i Skövde" />
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.info-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full height for demonstration */
  background-color: #8bb8e2;
}

.content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch; /* Ensures children take up the full height */
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 80%;
  max-width: 1200px;
}

.text-section {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centers the text vertically */
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

h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
}

p {
  font-size: 1.2rem;
  color: #666;
  line-height: 1.6;
}
</style>
