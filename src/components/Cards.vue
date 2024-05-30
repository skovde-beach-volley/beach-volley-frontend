<template>
  <div class="cards-container p-4 mt-10 mb-10">
    <div class="cards flex flex-row justify-center flex-wrap">
      <div v-for="(card, index) in cards" :key="index" class="p-12">
        <div
          class="card w-64 h-96 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 shadow-lg"
        >
          <a href="#">
            <img :src="card.image" class="rounded-t-lg h-1/2 w-full object-cover" alt="" />
          </a>
          <div class="p-5">
            <a href="#">
              <h5 class="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
                {{ card.title }}
              </h5>
            </a>
            <p class="mb-3 text-sm text-gray-700 dark:text-gray-400">{{ card.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardList',
  props: {
    cards: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
.cards-container {
  /* background: linear-gradient(135deg, #f062d6, #e837b6); */
  padding-top: 10px;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  background-color: whitesmoke;
  /* background-color: #8bb8e2; */
  transition: transform 0.2s ease-in-out; /* Transition för en mjuk animering */
}

.card:hover {
  transform: scale(1.05); /* Gör kortet 5% större vid hover */
}

.test {
  background-color: #c143ae;
}
</style>
