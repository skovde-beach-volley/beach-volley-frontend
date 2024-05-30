<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useLoggedInStore } from '@/stores/loggedIn'
import { watch, computed } from 'vue'

export default {
  components: {
    FullCalendar
  },
  setup() {
    const loggedInStore = useLoggedInStore()
    watch(
      () => loggedInStore.isLoggedIn,
      (newValue) => {
        this.isLoggedIn = newValue
      }
    )

    watch(
      () => loggedInStore.username,
      (newValue) => {
        this.username = newValue
      }
    )

    const isLoggedIn = computed(() => loggedInStore.isLoggedIn)
    const username = computed(() => loggedInStore.username)
    const eventColor = computed(() => {
      return isLoggedIn.value && username.value === 'sanna.asp@hotmail.com' ? 'green' : 'green'
    })
    return {
      isLoggedIn,
      username,
      eventColor
    }
  },
  created() {
    const savedBookings = localStorage.getItem('bookings')
    if (savedBookings) {
      this.calendarOptions.events = JSON.parse(savedBookings)
    }
    this.highlightBookedTimes()
    this.setBackgroundColorOfAllOwnedEvents()
  },

  data() {
    return {
      selectedStartTime: '',
      selectedEndTime: '',
      openBookingModal: false,
      openBookingInfoModal: false,
      openConfirmationModal: false,
      bookingDate: '',
      bookingStartTime: '',
      bookingEndTime: '',
      bookingName: '',
      bookingEmail: '',
      selectedBooking: null,
      isEditing: false,
      deleteMessage: '',
      confirmedBooking: '',
      bookingCounts: {},
      timeDisabledStates: [],
      availableTimes: [
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00'
      ],

      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        views: {
          dayGridMonth: { type: 'dayGridMonth', buttonText: 'Månad' },
          timeGridWeek: { type: 'timeGridWeek', buttonText: 'Vecka' },
          timeGridDay: { type: 'timeGridDay', buttonText: 'Dag' }
        },
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick,
        eventClick: this.handleEventClick,
        events: [],
        initialEvents: this.events,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        buttonText: {
          today: 'Idag',
          month: 'Månad',
          week: 'Vecka',
          day: 'Dag'
        },
        slotMinTime: '08:00',
        slotMaxTime: '23:00',
        slotDuration: '01:00:00',
        slotLabelFormat: { hour: '2-digit', minute: '2-digit', hour12: false },
        eventTimeFormat: { hour: '2-digit', minute: '2-digit', hour12: false },
        eventColor: this.eventColor.value,
        selectOverlap: function (event) {
          return !event.extendedProps.isBooked
        },
        eventOverlap: false,
        selectable: true,
        select: this.handleSelect,
        locale: 'sv'
      },
      eventContent: function (arg) {
        const isLoggedIn = this.isLoggedIn.value
        const username = this.username.value
        if (isLoggedIn && username === 'sanna.asp@hotmail.com') {
          return { eventColor: 'green' }
        } else {
          return { eventColor: 'blue', borderColor: 'blue', color: 'white' }
        }
      }
    }
  },
  methods: {
    handleStartClick(time, event) {
      if (this.timeDisabledStates[time]) return // Förhindra klick på röda knappar
      this.selectedStartTime = time
      this.selectStartTime(time, event)
    },
    handleEndClick(time, event) {
      if (this.timeDisabledStates[time]) return // Förhindra klick på röda knappar
      event.target.style.backgroundColor = 'white'
      this.selectedEndTime = time
      this.selectEndTime(time, event)
    },
    showModal: function () {
      this.openBookingModal = true
      this.deleteMessage = ''
      this.highlightBookedTimes()
    },
    closeBookingModal: function () {
      this.openBookingModal = false
      this.resetButtonStyles()
      this.resetEditBooking()
    },
    resetButtonStyles() {
      this.selectedStartTime = ''
      this.selectedEndTime = ''
    },
    highlightBookedTimes() {
      const bookings = this.calendarOptions.events // Hämtar alla bokningar från kalenderns events-array
      this.availableTimes.forEach((time) => {
        // Itererar över alla tillgängliga tider
        this.timeDisabledStates[time] = bookings.some((booking) => {
          // För varje tid, kontrollera om den är upptagen
          const bookingStart = new Date(booking.start).getTime() // Konverterar bokningens starttid till en tidsstämpel
          const bookingEnd = new Date(booking.end).getTime() // Konverterar bokningens sluttid till en tidsstämpel
          const selectedTime = new Date(`${this.bookingDate}T${time}`).getTime() // Konverterar den valda tiden till en tidsstämpel
          return selectedTime >= bookingStart && selectedTime < bookingEnd // Kollar om den valda tiden är inom intervallet för en bokning
        })
      })
    },
    setBackgroundColorOfAllOwnedEvents() {
      const bookings = this.calendarOptions.events
      const username = this.username
      bookings.forEach((booking) => {
        if (booking.bookerEmail == username) {
          booking.backgroundColor = 'green'
          booking.color = 'green'
          booking.textColor = 'green'
        } else {
          booking.backgroundColor = 'red'
          booking.color = 'red'
          booking.textColor = 'white'
        }
      })
    },
    selectStartTime(time, event) {
      event.preventDefault()
      this.bookingStartTime = time
      this.highlightBookedTimes()
    },
    selectEndTime(time, event) {
      event.preventDefault()
      if (!this.timeDisabledStates[time]) {
        this.bookingEndTime = time
        this.highlightBookedTimes()
      }
    },
    showConfirmedBooking() {
      this.confirmedBooking = 'Din bokning är bekräftad!'
      this.openConfirmationModal = true
      setTimeout(() => {
        this.confirmedBooking = ''
        this.openConfirmationModal = false
      }, 3000)
    },
    submitBooking() {
      if (!this.bookingName || !this.bookingEmail) {
        alert('Namn och mail-adress måste fyllas i för att boka.')
        return
      }
      const maxBookingsPerPerson = 2
      const maxBookingDuration = 2 * 60 * 60 * 1000
      const person = this.bookingEmail
      const bookingStartTime = new Date(this.bookingDate + 'T' + this.bookingStartTime)
      const bookingEndTime = new Date(this.bookingDate + 'T' + this.bookingEndTime)

      if (bookingStartTime >= bookingEndTime) {
        alert('Starttiden måste vara före sluttiden.')
        return
      }

      const bookingDuration = bookingEndTime - bookingStartTime
      if (bookingDuration > maxBookingDuration) {
        alert('Bokningen får inte vara längre än två timmar.')
        return
      }

      const conflictingBooking = this.calendarOptions.events.find((event) => {
        const eventStartTime = new Date(event.start)
        const eventEndTime = new Date(event.end)
        return eventStartTime <= bookingEndTime && eventEndTime >= bookingStartTime
      })

      if (conflictingBooking) {
        alert('Det finns redan en bokning för den valda tiden.')
        this.highlightBookedTimes()
        return
      }

      if (this.bookingCounts[person] && this.bookingCounts[person] >= maxBookingsPerPerson) {
        alert('Du får inte göra fler än två bokningar!')
        return
      }

      const newBooking = {
        id: Date.now().toString(),
        title: this.bookingName,
        start: this.bookingDate + 'T' + this.bookingStartTime,
        end: this.bookingDate + 'T' + this.bookingEndTime,
        bookerEmail: this.bookingEmail
      }
      this.calendarOptions.events.push(newBooking)

      localStorage.setItem('bookings', JSON.stringify(this.calendarOptions.events))

      this.bookingCounts[person] = (this.bookingCounts[person] || 0) + 1

      this.$refs.fullcalendar.getApi().refetchEvents()

      this.bookingDate = ''
      this.bookingStartTime = ''
      this.bookingEndTime = ''
      this.bookingName = ''
      this.bookingEmail = ''
      this.selectedBooking = null

      this.closeBookingModal()

      this.showConfirmedBooking()
    },
    handleEditClick: function () {
      if (this.selectedBooking) {
        const event = this.calendarOptions.events.find((e) => e.id === this.selectedBooking.id)
        if (event) {
          event.start = this.bookingDate + 'T' + this.bookingStartTime
          event.end = this.bookingDate + 'T' + this.bookingEndTime
          event.title = this.bookingName
          event.bookerEmail = this.bookingEmail
        }
        localStorage.setItem('bookings', JSON.stringify(this.calendarOptions.events))
        this.closeBookingModal()
      }
    },
    handleDateClick: function (arg) {
      const endDate = new Date(arg.dateStr)
      endDate.setHours(endDate.getHours() + 4)
      const newEvent = {
        id: Date.now().toString(),
        title: 'Bokning',
        start: new Date(arg.dateStr),
        end: endDate
      }
      this.openBookingModal = true
      this.bookingDate = new Date(arg.dateStr).toISOString().split('T')[0]
      this.bookingStartTime = ''
      this.bookingEndTime = ''
      this.isEditing = false
      this.highlightBookedTimes()
    },
    handleDeleteClick: function (booking) {
      if (this.isLoggedIn) {
        if (booking.booker === this.username) {
          // Use bookerEmail if that's the correct property
          const savedBookings = localStorage.getItem('bookings')
          if (savedBookings) {
            const bookings = JSON.parse(savedBookings)
            const updatedBookings = bookings.filter((event) => event.id !== booking.id)
            localStorage.setItem('bookings', JSON.stringify(updatedBookings))
          }

          this.calendarOptions.events = this.calendarOptions.events.filter((event) => {
            return event.id !== booking.id
          })
          this.$refs.fullcalendar.getApi().refetchEvents()
          this.closeBookingModal()
          this.deleteMessage = 'Din bokning är raderad'
          console.log('Booking deleted successfully')
        } else {
          alert('Du kan inte radera någon annans bokning.')
        }
      } else {
        const savedBookings = localStorage.getItem('bookings')
        if (savedBookings) {
          const bookings = JSON.parse(savedBookings)
          const updatedBookings = bookings.filter((event) => event.id !== booking.id)
          localStorage.setItem('bookings', JSON.stringify(updatedBookings))
        }

        this.calendarOptions.events = this.calendarOptions.events.filter((event) => {
          return event.id !== booking.id
        })
        this.$refs.fullcalendar.getApi().refetchEvents()
        this.closeBookingModal()
        this.deleteMessage = 'Din bokning är raderad'
        console.log('Booking deleted successfully')
      }
    },

    editBooking: function (booking) {
      if (this.isLoggedIn) {
        if (booking.booker === this.username) {
          this.bookingName = booking.title
          this.bookingEmail = booking.booker
          this.closeBookingInfoModal()
          this.isEditing = true
          this.openBookingModal = true
          this.highlightBookedTimes()
        } else {
          alert('Du kan inte redigera någon annans bokning.')
        }
      } else {
        this.bookingName = booking.title
        this.bookingEmail = booking.booker
        this.closeBookingInfoModal()
        this.isEditing = true
        this.openBookingModal = true
        this.highlightBookedTimes()
      }
    },
    resetEditBooking: function (booking) {
      this.bookingName = ''
      this.bookingEmail = ''
    },
    handleEventClick: function (arg) {
      const event = arg.event
      this.isEditing = false
      this.selectedBooking = {
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        booker: event.extendedProps.bookerEmail
      }
      this.bookingDate = event.startStr.split('T')[0]
      this.bookingStartTime = event.startStr.split('T')[1].substring(0, 5)
      this.bookingEndTime = event.endStr.split('T')[1].substring(0, 5)
      this.openBookingInfoModal = true
      this.setBackgroundColorOfAllOwnedEvents()
    },
    closeBookingInfoModal: function () {
      this.openBookingInfoModal = false
      this.deleteMessage = ''
    }
  }
}
</script>

<template>
  <div class="calender-container mt-36">
    <div class="flex justify-center flex-col mb-10">
      <h2 class="text-2xl">Välj en tid för att boka våra beachvolleybollplaner!</h2>
      <p>Klicka på knappen eller direkt i kalendern för att boka.</p>
      <p>(Vid inloggning är dina bokningar gröna)</p>
    </div>

    <button
      class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm w-32 px-3 py-2 text-center mb-2"
      @click="showModal"
    >
      Boka tid
    </button>

    <div v-if="openBookingModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeBookingModal">&times;</span>

        <form @submit.prevent="">
          <div class="booking-container">
            <div class="modal-label">
              <label for="booking-date">Datum:</label>
              <input
                type="date"
                id="booking-date"
                v-model="bookingDate"
                @change="highlightBookedTimes"
                required
              />
            </div>

            <div class="modal-label">
              <label for="booking-start-time">Startid:</label>
              <div class="booking-buttons" id="booking-start-time">
                <button
                  @mouseover="$event.target.style.backgroundColor = 'darkgreen'"
                  @mouseleave="
                    $event.target.style.backgroundColor = timeDisabledStates[time] ? 'red' : 'green'
                  "
                  @click="handleStartClick(time, $event)"
                  :style="{ backgroundColor: timeDisabledStates[time] ? 'red' : 'green' }"
                  :class="{ selectedBooking: selectedStartTime === time }"
                  class="time-button"
                  v-for="time in availableTimes"
                  :key="time"
                  :disabled="timeDisabledStates[time]"
                >
                  {{ time }}
                </button>
              </div>
            </div>

            <div class="modal-label">
              <label for="booking-end-time">Sluttid:</label>
              <div class="booking-buttons" id="booking-end-time">
                <button
                  @mouseover="$event.target.style.backgroundColor = 'darkgreen'"
                  @mouseleave="
                    $event.target.style.backgroundColor = timeDisabledStates[time] ? 'red' : 'green'
                  "
                  class="time-button"
                  :class="{ selectedBooking: selectedEndTime === time }"
                  v-for="time in availableTimes"
                  :key="time"
                  @click="handleEndClick(time, $event)"
                  :style="{ backgroundColor: timeDisabledStates[time] ? 'red' : 'green' }"
                  :disabled="timeDisabledStates[time]"
                >
                  {{ time }}
                </button>
              </div>
            </div>
          </div>

          <div class="email-container">
            <div class="modal-label">
              <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    for="first_name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Namn</label
                  >
                  <input
                    type="text"
                    id="booking-name"
                    v-model="bookingName"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Namn"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="modal-label">
              <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    for="email_adress"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Mail-adress</label
                  >
                  <input
                    type="text"
                    id="booking-email"
                    v-model="bookingEmail"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Email"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div v-if="isEditing" class="bookingtime-button">
            <button
              class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm w-32 px-3 py-2 text-center mb-2"
              @click="handleEditClick()"
            >
              Redigera bokning
            </button>
          </div>

          <div v-else class="bookingtime-button">
            <button
              class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm w-32 px-3 py-2 text-center mb-2"
              @click="submitBooking()"
            >
              Boka
            </button>
          </div>
        </form>
      </div>
    </div>
    <div v-if="openBookingInfoModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeBookingInfoModal">&times;</span>
        <div v-if="selectedBooking && !deleteMessage">
          <p>Bokningens namn: {{ selectedBooking.title }}</p>
          <p>Starttid: {{ selectedBooking.start.toLocaleString() }}</p>
          <p>Sluttid: {{ selectedBooking.end.toLocaleString() }}</p>
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
        <div v-if="deleteMessage" class="confirmedMessage">{{ deleteMessage }}</div>
      </div>
    </div>

    <FullCalendar ref="fullcalendar" :options="calendarOptions" class="custom-calendar" />

    <!-- Confirmation Modal -->
    <div v-if="openConfirmationModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="openConfirmationModal = false">&times;</span>
        <div class="confirmedMessage">{{ confirmedBooking }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calender-container {
  margin-bottom: 50px;
  background-color: rgb(255, 255, 255, 0.9);
  border-radius: 0 0 20px 20px;
  padding: 40px;
}

.custom-calendar {
  max-width: 900px; /* Exempel på bredd */
  margin: 0 auto; /* Centrerar kalendern */
  height: 700px; /* Exempel på höjd */
}

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

.modal-label {
  margin: 10px;
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
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

.booking-container {
  display: flex;
  flex-direction: row;
}

.booking-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.time-button {
  background-color: green;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 16px;
}

.email-container {
  display: flex;
  flex-direction: column;
}

.selectedBooking {
  background-color: darkgreen !important;
  color: white;
}

.confirmedMessage {
  color: green;
  font-size: 1.2em;
  text-align: center;
  margin-top: 20px;
}

.buttons-container {
  display: flex;
  justify-content: space-between;
}

.bookingtime-button {
  display: flex;
  justify-content: center;
}
</style>
