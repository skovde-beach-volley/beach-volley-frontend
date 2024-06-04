<script>
import PageHeader from '../components/PageHeader.vue'
import Cards from '../components/Cards.vue'

import image1 from '../assets/front-view-female.jpg'
import image2 from '../assets/group.jpg'
import image3 from '../assets/playing.jpg'

export default {
  components: {
    PageHeader,
    Cards
  },
  data() {
    return {
      cards: [
        {
          image: image1,
          title: 'TRÄNINGSGRUPPER',
          description: 'Kom och testa på en av våra träningsgrupper.'
        },
        {
          image: image2,
          title: 'VART FINNS VI',
          description: 'Vi finns i Karstorp i Skövde.'
        },
        {
          image: image3,
          title: 'BLI MEDLEM',
          description: 'Hur du blir medlem i Skövde beachvolley och vilka förmåner du får.'
        }
      ]
    }
  }
}
</script>

<template>
  <div class="background">
    <PageHeader />
    <div class="content-container flex items-center justify-center">
      <!-- <img class="splash" src="../assets/splash.png" alt="img" /> -->

      <div data-aos="fade-up">
        <p class="page-header text-center">VI VÄLKOMNAR SPELARE I ALLA ÅLDRAR OCH PÅ ALLA NIVÅER</p>
      </div>
    </div>
    <hr class="line-container" />
    <div>
      <Cards :cards="cards" />
    </div>
  </div>
</template>

<style scoped>
.background {
  background: url(../assets/longblue.png);
  background-size: cover;
}
.content-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  /* height: 300px;  */
  margin-top: 200px;
  margin-bottom: 200px;
  /* margin: 70px; */
  background: url(../assets/longblue.png);
  background-size: cover;
}

.page-header {
  font-size: 3rem; /* Adjust font size */
  color: #c143ae; /* Adjust text color */
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 10px; /* Add padding for better readability */
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  letter-spacing: 0.05em; /* Adjust letter spacing */
}

.line-container {
  border: 0;
  height: 2px; /* Set line height */
  background-color: #c143ae; /* Set line color */
  margin: 20px auto; /* Add margins above and below the line */
  width: 50%;
  justify-content: center;
}

@media (max-width: 1200px) {
  .page-header {
    width: 70%; /* Adjust width for smaller screens */
  }
}

@media (max-width: 1000px) {
  .page-header {
    width: 80%; /* Adjust width for smaller screens */
  }
}

@media (max-width: 800px) {
  .page-header {
    width: 90%; /* Adjust width for smaller screens */
    margin-top: 80px;
    margin-bottom: 80px;
  }
  .content-container {
    margin: 0;
  }
}
</style>
