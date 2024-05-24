<template>
  <div>
    <PageHeader />
    <div class="flex items-center justify-center h-52 w-full">
      <p class="w-96 text-center">
        Beachvolley Skövde är en dynamisk och passionerad förening som ägnar sig åt att främja och
        utveckla beachvolleybollsporten i Skövde och dess omgivningar. Vi välkomnar spelare i alla
        åldrar och på alla nivåer, från nybörjare till erfarna atleter.
      </p>
    </div>
    <div>
      <Cards :cards="cards" />
    </div>
  </div>
</template>

<script>
import PageHeader from '../components/PageHeader.vue'
import Cards from '../components/Cards.vue'

export default {
  components: {
    PageHeader,
    Cards
  },
  data() {
    return {
      cards: [
        {
          image: './assets/skovdebeachvolley_logo.png',
          title: 'Träningsgrupper',
          description:
            'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.'
        },
        {
          image: 'path/to/image2.jpg',
          title: 'Vart finns vi',
          description: 'Details about another significant acquisition in the tech industry.'
        },
        {
          image: 'path/to/image3.jpg',
          title: 'Bli medlem',
          description: 'Information about major technology deals that took place in 2021.'
        }
      ]
    }
  }
}
</script>
