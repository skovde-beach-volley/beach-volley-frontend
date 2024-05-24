<script>
export default {
  name: 'PageHeader'
}
</script>

<template>
  <header class="header"></header>
</template>

<style>
.header {
  background-image: url(../assets/beachvolley.png);
  background-size: cover; /* Gör att bilden täcker hela elementets yta */
  background-position: center; /* Centrerar bilden i elementet */
  height: 50vh; /* Sätter höjden på headern till 50% av viewportens höjd */
  width: 100%; /* Sätter bredden på headern till 100% av viewportens bredd */
  background-repeat: no-repeat; /* Förhindrar att bilden upprepas */
  display: flex; /* Gör det möjligt att centrera innehåll */
  align-items: left; /* Vertikal centrering av innehåll */
  justify-content: center; /* Horisontell centrering av innehåll */
}
</style>
