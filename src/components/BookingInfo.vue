<script>
export default {
  props: {
    selectedBooking: Object
  },
  emits: ['edit', 'delete', 'close', 'closeModal'],
  data() {
    return {
      openConfirmationModal: false,
      openBookingInfoModal: false
    }
  },
  methods: {
    editBooking(booking) {
      this.$emit('edit', booking)
    },
    handleDeleteClick(booking) {
      this.$emit('delete', booking)
      this.openConfirmationModal = true
    },
    closeConfirmationModal() {
      // Dölj bekräftelsemodalen när användaren stänger den
      this.openConfirmationModal = false
      this.openBookingInfoModal = false
      this.$emit('closeModal')
    }
  }
}
</script>

<template>
  <div v-if="selectedBooking">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <div v-if="!openConfirmationModal">
        <p><strong>Bokningens namn:</strong> {{ selectedBooking.title }}</p>
        <p><strong>Starttid:</strong> {{ new Date(selectedBooking.start).toLocaleString() }}</p>
        <p><strong>Sluttid:</strong> {{ new Date(selectedBooking.end).toLocaleString() }}</p>
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
    </div>
  </div>
  <div v-if="openConfirmationModal">
    <div class="modal">
      <div class="modal-content">
        <span class="close" @click="closeConfirmationModal">&times;</span>
        <div class="confirmedMessage">Din bokning är raderad!</div>
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
