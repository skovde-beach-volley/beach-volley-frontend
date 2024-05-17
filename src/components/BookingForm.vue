<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      openBookingModal: false,
      bookingDate: '',
      bookingStartTime: '',
      bookingEndTime: '',
      bookingName: '',
      bookingEmail: '',
      selectedBooking: null,

      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        views: {
          dayGridMonth: {
            // Visa som månadsvy
            type: 'dayGridMonth',
            buttonText: 'Månad'
          },
          timeGridWeek: {
            // Visa som veckovy
            type: 'timeGridWeek',
            buttonText: 'Vecka'
          },
          timeGridDay: {
            // Visa som dagsvy
            type: 'timeGridDay',
            buttonText: 'Dag'
          }
        },
        initialView: 'dayGridMonth', // Börja med att visa som månadsvy
        dateClick: this.handleDateClick,
        events: [
          { title: 'event 1', date: '2019-04-01' },
          { title: 'event 2', date: '2019-04-02' }
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        slotMinTime: '08:00',
        slotMaxTime: '23:00',
        slotDuration: '01:00:00', // Varje "slot" är 1 timme lång
        slotLabelFormat: {
          hour: 'numeric', // Visa bara timmen
          hour12: false // Visa timmar i 24-timmarsformat
        }
      }
    }
  },
  methods: {
    showModal: function () {
      this.openBookingModal = true
      console.log(this.openBookingModal)
    },

    closeBookingModal: function () {
      this.openBookingModal = false
    },

    submitBooking() {
      const newBooking = {
        title: 'Bokning',
        start: this.bookingDate + 'T' + this.bookingStartTime,
        end: this.bookingDate + 'T' + this.bookingEndTime
      }

      this.calendarOptions.events.push(newBooking)

      this.$refs.fullcalendar.getApi().refetchEvents()

      this.bookingDate = ''
      this.bookingStartTime = ''
      this.bookingEndTime = ''

      this.closeBookingModal()
    }

    // handleDateClick: function (arg) {
    //   alert('date click! ' + arg.dateStr)
    // }
  }
}
</script>

<template>
  <button @click="showModal">Boka tid</button>

  <!-- Modal for booking -->
  <div v-if="openBookingModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeBookingModal">&times;</span>
      <!-- <h2>Boka tid</h2> -->
      <form @submit.prevent="submitBooking">
        <div class="booking-container">
          <div class="modal-label">
            <label for="booking-date">Datum:</label>
            <input type="date" id="booking-date" v-model="bookingDate" required />
          </div>
          <div class="modal-label">
            <label for="booking-start-time">Startid:</label>
            <input
              type="time"
              id="booking-start-time"
              v-model="bookingStartTime"
              step="3600"
              required
            />
            <!-- <option value="08:00">08:00</option>
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option> -->
          </div>
          <div class="modal-label">
            <label for="booking-end-time">Slutid:</label>
            <input
              type="time"
              id="booking-end-time"
              v-model="bookingEndTime"
              step="3600"
              required
            />
            <!-- <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option> -->
          </div>
        </div>
        <div class="booking-container">
          <div class="modal-label">
            <label>Namn</label>
            <input type="text" id="booking-name" required />
          </div>
          <div class="modal-label">
            <label>Mail-adress</label>
            <input type="email" id="booking-email" required />
          </div>
        </div>
        <div class="booking-button">
          <button type="submit">Boka</button>
        </div>
      </form>
    </div>
  </div>
  <FullCalendar :options="calendarOptions" />
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
  background-color: rgba(0, 0, 0, 0.4); /* Bakgrundsfärg med genomskinlighet */
  pointer-events: none; /* Tillåter inte klickhändelser på bakgrunden */
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  pointer-events: auto; /* Tillåter klickhändelser på modalfönstrets innehåll */
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

.modal-label {
  margin: 10px;
}

.booking-container {
  display: flex;
  flex-direction: row;
}

.booking-button {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
