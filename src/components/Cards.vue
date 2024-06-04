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
  /* color: #2c3e50; */
  /* color: #0b132b; */
  /* background-color: #8bb8e2; */
  transition: transform 0.2s ease-in-out; /* Transition för en mjuk animering */
  position: relative; /* Gör att den inre positioneringen kan användas */
}

.card:hover {
  transform: scale(1.05); /* Gör kortet 5% större vid hover */
}

.read-more {
  position: absolute; /* Gör att länken kan positioneras absolut inom kortet */
  bottom: 10px; /* Placera länken 10px från botten av kortet */
  right: 10px; /* Placera länken 10px från höger sida av kortet */
}

.test {
  background-color: #c143ae;
}
</style>
