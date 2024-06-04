<script>
import PageHeader from '../components/PageHeader.vue'
import Cards from '../components/Cards.vue'

import image1 from '../assets/images/front-view-female.jpg'
import image2 from '../assets/images/group.jpg'
import image3 from '../assets/images/playing.jpg'

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
      <p class="page-header text-center">VI VÄLKOMNAR SPELARE I ALLA ÅLDRAR OCH PÅ ALLA NIVÅER</p>
    </div>
    <div>
      <Cards :cards="cards" />
    </div>
  </div>
</template>

<style scoped>
.text-animation {
  width: 70%;
}
.background {
  background: url(../assets/images/longblue.png);
  background-size: cover;
}
.content-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 200px;
  margin-bottom: 200px;
}

.page-header {
  font-size: 3rem;
  color: #c143ae;
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 10px;
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  letter-spacing: 0.05em;
}

@media (max-width: 1200px) {
  .page-header {
    font-size: 2.5rem;
  }
}

@media (max-width: 1000px) {
  .page-header {
    font-size: 2rem;
  }
}

@media (max-width: 800px) {
  .page-header {
    font-size: 1.5rem;
    width: 100%;
    margin-top: 80px;
    margin-bottom: 80px;
  }
  .content-container {
    margin: 0;
  }
}
</style>
