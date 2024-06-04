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
            <div class="read-more">
              <a>Läs mer</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cards-container {
  /* background: url('../assets/blueform.png'); */
  background-size: cover;
  /* background-color: #8bb8e2; */
  padding-top: 10px;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  background-color: whitesmoke;
  transition: transform 0.2s ease-in-out;
  position: relative;
}

.card:hover {
  transform: scale(1.05);
}

.read-more {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.test {
  background-color: #c143ae;
}
</style>
