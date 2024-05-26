<template>
  <div class="info-page">
    <div class="content">
      <div class="text-section">
        <h1 class="text-3xl">Om Beachvolleyboll i Skövde</h1>
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
        <img src="../assets/front-view-female.jpg" alt="Beachvolleyboll i Skövde" />
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
  background-color: #f5f5f5;
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
