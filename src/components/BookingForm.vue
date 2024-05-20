<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  created() {
    const savedBookings = localStorage.getItem('bookings')
    if (savedBookings) {
      this.calendarOptions.events = JSON.parse(savedBookings)
    }
    // this.calendarOptions.eventContent = function (arg) {
    //   if (arg.event.extendedProps.booker === 'sanna.asp@hotmail.com') {
    //     return { backgroundColor: 'green', borderColor: 'green', color: 'white' }
    //   } else {
    //     return { backgroundColor: 'blue', borderColor: 'blue', color: 'white' }
    //   }
    // }.bind(this)
  },
  data() {
    return {
      openBookingModal: false,
      openBookingInfoModal: false,
      bookingDate: '',
      bookingStartTime: '',
      bookingEndTime: '',
      bookingName: '',
      bookingEmail: '',
      selectedBooking: null,
      isEditing: false,
      deleteMessage: '',
      bookingCounts: {},

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
        eventClick: this.handleEventClick,
        events: [
          { id: 'aaaaaa', title: 'event 1ggg', date: '2024-05-17' },
          { id: '1', title: 'event 1ggg', date: '2024-05-17' },
          { title: 'event 2', date: '2019-04-02' }
        ],
        initialEvents: this.events,
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
      this.deleteMessage = ''
      console.log(this.openBookingModal)
    },

    closeBookingModal: function () {
      this.openBookingModal = false
    },

    submitBooking() {
      const maxBookingsPerPerson = 2
      const person = this.bookingEmail

      const conflictingBooking = this.calendarOptions.events.find((event) => {
        const eventStartTime = new Date(event.start)
        const eventEndTime = new Date(event.end)
        const bookingStartTime = new Date(this.bookingDate + 'T' + this.bookingStartTime)
        const bookingEndTime = new Date(this.bookingDate + 'T' + this.bookingEndTime)

        return eventStartTime <= bookingEndTime && eventEndTime >= bookingStartTime
      })
      if (conflictingBooking) {
        alert('Det finns redan en bokning för den valda tiden.')
        return
      }

      if (this.bookingCounts[person] && this.bookingCounts[person] >= maxBookingsPerPerson) {
        alert('Du får inte göra fler än två bokningar!')
        return
      }

      if (this.bookingDate && this.bookingStartTime && this.bookingEndTime) {
        if (this.selectedBooking !== null) {
          const event = this.calendarOptions.events.find((e) => e.id === this.selectedBooking.id)
          if (event) {
            event.start = this.bookingDate + 'T' + this.bookingStartTime
            event.end = this.bookingDate + 'T' + this.bookingEndTime
          }
        } else {
          const newBooking = {
            id: Date.now().toString(), // Generate a unique ID for the new event
            title: 'Bokning',
            start: this.bookingDate + 'T' + this.bookingStartTime,
            end: this.bookingDate + 'T' + this.bookingEndTime
          }
          this.calendarOptions.events.push(newBooking)
          localStorage.setItem('bookings', JSON.stringify(this.calendarOptions.events))
        }
        this.bookingCounts[person] = (this.bookingCounts[person] || 0) + 1
        this.$refs.fullcalendar.getApi().refetchEvents()

        this.bookingDate = ''
        this.bookingStartTime = ''
        this.bookingEndTime = ''
        this.closeBookingModal()
      }
      return eventStartTime <= bookingEndTime && eventEndTime >= bookingStartTime
    },

    handleDateClick: function (arg) {
      const endDate = new Date(arg.dateStr)
      endDate.setHours(endDate.getHours() + 4)
      const newEvent = {
        id: Date.now().toString(), // Generate a unique ID for the new event
        title: 'Bokning',
        // start: this.bookingDate + 'T' + this.bookingStartTime,
        // end: this.bookingDate + 'T' + this.bookingEndTime
        start: new Date(arg.dateStr),
        end: endDate
      }
      this.openBookingModal = true
      this.bookingDate = new Date(arg.dateStr).toISOString().split('T')[0]
      this.bookingStartTime = new Date(arg.dateStr).toISOString().split('T')[1].substring(0, 5)
      this.bookingEndTime = new Date(endDate).toISOString().split('T')[1].substring(0, 5)
      // this.calendarOptions.events.push(newEvent)
      console.log('arg:', arg)
      console.log(this.calendarOptions.events)
    },

    handleDeleteClick: function (arg) {
      if (this.selectedBooking) {
        const savedBookings = localStorage.getItem('bookings')
        if (savedBookings) {
          const bookings = JSON.parse(savedBookings)
          const updatedBookings = bookings.filter((event) => event.id !== this.selectedBooking.id)
          localStorage.setItem('bookings', JSON.stringify(updatedBookings))
        }
        this.calendarOptions.events = this.calendarOptions.events.filter((event) => {
          console.log('event', event)
          // event.id !== arg.event._def.publicId
          // return event.id !== arg.event._def.publicId
          return event.id !== this.selectedBooking.id
        })
        this.$refs.fullcalendar.getApi().refetchEvents()
        this.closeBookingModal()
        this.deleteMessage = 'Din bokning är raderad'
      } else {
        console.log('error')
      }
    },

    editBooking: function () {
      this.closeBookingInfoModal()
      this.isEditing = false
      this.openBookingModal = true
    },

    handleEventClick: function (arg) {
      const event = arg.event
      this.isEditing = true
      this.selectedBooking = event
      this.bookingDate = event.startStr.split('T')[0]
      this.bookingStartTime = event.startStr.split('T')[1].substring(0, 5)
      this.bookingEndTime = event.endStr.split('T')[1].substring(0, 5)
      this.bookingName = ''
      this.openBookingInfoModal = true
      this.bookingEmail = ''

      // this.openBookingModal = true
      // this.handleDeleteClick(arg)
    },
    closeBookingInfoModal: function () {
      this.openBookingInfoModal = false
      this.selectedBooking = null
      this.deleteMessage = ''
    }
  }
}
</script>

<template>
  <button @click="showModal">Boka tid</button>

  <div v-if="openBookingModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeBookingModal">&times;</span>

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
            <input type="email" id="booking-email" v-model="bookingEmail" required />
          </div>
        </div>
        <div class="booking-button">
          <button type="submit">Boka</button>
        </div>
      </form>
    </div>
  </div>
  <div v-if="openBookingInfoModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeBookingInfoModal">&times;</span>
      <div v-if="selectedBooking && !deleteMessage">
        <h2>Här är din bokning</h2>
        <p>Bokningens namn: {{ selectedBooking.title }}</p>
        <p>Starttid: {{ selectedBooking.start.toLocaleString() }}</p>
        <p>Sluttid: {{ selectedBooking.end.toLocaleString() }}</p>

        <button @click="editBooking">Redigera bokning</button>
        <button @click="handleDeleteClick">Radera bokning</button>
      </div>
      <div v-if="deleteMessage" class="deleteMessage">{{ deleteMessage }}</div>
    </div>
  </div>

  <FullCalendar ref="fullcalendar" :options="calendarOptions" />
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

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  pointer-events: auto;
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
