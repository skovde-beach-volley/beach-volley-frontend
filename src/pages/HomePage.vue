<template>
  <div>
    <PageHeader />
    <div class="flex items-center justify-center h-52 m-20">
      <p class="page-header w-96 text-center">
        Beachvolley Skövde är en dynamisk och passionerad förening som ägnar sig åt att främja och
        utveckla beachvolleybollsporten i Skövde och dess omgivningar. Vi välkomnar spelare i alla
        åldrar och på alla nivåer, från nybörjare till erfarna atleter.
      </p>
    </div>
    <hr class="line-container" />
    <div>
      <Cards :cards="cards" />
    </div>
  </div>
</template>

<script>
import PageHeader from '../components/PageHeader.vue'
import Cards from '../components/Cards.vue'

import image1 from '../assets/front-view-female.jpg'
import image2 from '../assets/group.jpg'
import image3 from '../assets/front-view-female.jpg'

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
          title: 'Träningsgrupper',
          description:
            'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.'
        },
        {
          image: image2,
          title: 'Vart finns vi',
          description: 'Details about another significant acquisition in the tech industry.'
        },
        {
          image: image3,
          title: 'Bli medlem',
          description: 'Information about major technology deals that took place in 2021.'
        }
      ]
    }
  }
}
</script>

<style>
.page-header {
  color: black;
}
.line-container {
  border: 0;
  height: 2px; /* Sätter höjden på linjen */
  background-color: #c143ae; /* Sätter färgen på linjen */
  margin: 20px auto; /* Lägger till marginaler ovanför och under linjen */
  width: 50%;
  justify-content: center;
}
</style>
