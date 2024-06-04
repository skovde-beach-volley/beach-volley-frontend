<script>
export default {
  props: {
    selectedBooking: Object,
    deleteMessage: String
  },
  emits: ['edit', 'delete', 'close'],
  methods: {
    editBooking(booking) {
      this.$emit('edit', booking)
    },
    handleDeleteClick(booking) {
      this.$emit('delete', booking)
    }
  }
}
</script>

<template>
  <div v-if="selectedBooking" class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <div v-if="!deleteMessage">
        <p><Strong>Bokningens namn:</Strong> {{ selectedBooking.title }}</p>
        <p><Strong>Starttid: </Strong> {{ new Date(selectedBooking.start).toLocaleString() }}</p>
        <p><Strong>Sluttid:</Strong> {{ new Date(selectedBooking.end).toLocaleString() }}</p>
        <div class="buttons-container">
          <button
            class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm w-32 px-3 py-2 text-center mb-2 mr-10 mt-10"
            @click="editBooking(selectedBooking)"
          >
            Redigera bokning
          </button>
          <button
            class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm w-32 px-3 py-2 text-center mb-2 mt-10"
            @click="handleDeleteClick(selectedBooking)"
          >
            Radera bokning
          </button>
        </div>
      </div>
      <div>
        <div v-if="deleteMessage" class="modal">
          <div class="modal-content">
            <div class="confirmedMessage">{{ deleteMessage }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  pointer-events: none;
}
.confirmedMessage {
  font-size: 1.2em;
  text-align: center;
  margin-top: 20px;
}
.buttons-container {
  display: flex;
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
  pointer-events: auto;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
