<script>
export default {
  name: 'PageHeader'
}
</script>

<template>
  <header class="header"><h1 class="header-text">Skövde beachvolley</h1></header>
</template>

<style>
.header {
  position: relative; /* Behövs för att positionera pseudo-element rätt */
  background-image: url(../assets/side-view.jpg);
  background-size: cover; /* Gör att bilden täcker hela elementets yta */
  background-position: center; /* Centrerar bilden i elementet */
  height: 70vh; /* Sätter höjden på headern till 50% av viewportens höjd */
  width: 100%; /* Sätter bredden på headern till 100% av viewportens bredd */
  background-repeat: no-repeat; /* Förhindrar att bilden upprepas */
  display: flex; /* Gör det möjligt att centrera innehåll */
  align-items: center; /* Vertikal centrering av innehåll */
  justify-content: center; /* Horisontell centrering av innehåll */
}

.header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent svart färg */
  z-index: 1; /* Lägger pseudo-elementet under texten */
}

.header h1 {
  position: relative; /* Behövs för att positionera texten ovanför pseudo-elementet */
  color: white; /* Gör texten vit för bättre kontrast */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Lägger till skugga för att göra texten mer läsbar */
  font-size: 40px;
  margin-left: 40px;
  z-index: 2; /* Lägger texten ovanför pseudo-elementet */
}
</style>
