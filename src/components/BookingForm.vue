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
    // const loggedInStore = useLoggedInStore()
    // const isLoggedIn = computed(() => loggedInStore.isLoggedIn)
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
      return isLoggedIn.value && username.value === 'sanna.asp@hotmail.com' ? 'green' : 'blue'
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
      bookingDate: '',
      bookingStartTime: '',
      bookingEndTime: '',
      bookingName: '',
      bookingEmail: '',
      selectedBooking: null,
      isEditing: false,
      deleteMessage: '',
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
          {
            id: '1',
            title: 'event 1ggg',
            date: '2024-05-18',
            color: 'red',
            backgroundColor: 'green'
          },
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
        slotDuration: '01:00:00',
        slotLabelFormat: {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        },
        eventTimeFormat: {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        },
        eventColor: this.eventColor.value,

        selectOverlap: function (event) {
          return !event.extendedProps.isBooked
        },
        eventOverlap: false,
        selectable: true,
        select: this.handleSelect,
        locale: 'en-US'
      },
      eventContent: function (arg) {
        console.log('IsLoggedIN:', this.isLoggedIn)
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
      this.selectedStartTime = time
      this.selectStartTime(time, event)
    },

    handleEndClick(time, event) {
      event.target.style.backgroundColor = 'white'
      this.selectedEndTime = time
      this.selectEndTime(time, event)
    },

    showModal: function () {
      this.openBookingModal = true
      this.deleteMessage = ''
      this.highlightBookedTimes()
      console.log(this.openBookingModal)
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
      const bookings = this.calendarOptions.events

      this.availableTimes.forEach((time) => {
        this.timeDisabledStates[time] = bookings.some((booking) => {
          const bookingStart = new Date(booking.start).getTime()
          const bookingEnd = new Date(booking.end).getTime()
          const selectedTime = new Date(`${this.bookingDate}T${time}`).getTime()
          return selectedTime >= bookingStart && selectedTime < bookingEnd
        })
      })
    },

    setBackgroundColorOfAllOwnedEvents() {
      const bookings = this.calendarOptions.events
      const username = this.username
      console.log('Bookings', bookings)
      console.log('Username', username)
      bookings.forEach((booking) => {
        if (booking.bookerEmail == username) {
          console.log('match')
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
      console.log('Time clicked:', time)
      if (!this.timeDisabledStates[time]) {
        this.bookingEndTime = time
        console.log('Booking end time:', this.bookingEndTime)
        this.highlightBookedTimes()
      }
      // this.handleClick()
    },

    submitBooking() {
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
        id: Date.now().toString(), // Generate a unique ID for the new event
        title: this.bookingName,
        start: this.bookingDate + 'T' + this.bookingStartTime,
        end: this.bookingDate + 'T' + this.bookingEndTime,
        bookerEmail: this.bookingEmail
      }
      console.log('newbooking', newBooking)
      console.log('events', this.event)
      this.calendarOptions.events.push(newBooking)

      // Uppdatera lokala lagringen
      localStorage.setItem('bookings', JSON.stringify(this.calendarOptions.events))

      // Uppdatera bokningsräkning för personen
      this.bookingCounts[person] = (this.bookingCounts[person] || 0) + 1

      // Refresha kalendern
      this.$refs.fullcalendar.getApi().refetchEvents()

      // Återställ formulärfält
      this.bookingDate = ''
      this.bookingStartTime = ''
      this.bookingEndTime = ''
      this.bookingName = ''
      this.bookingEmail = ''
      this.selectedBooking = null
      this.closeBookingModal()
    },

    handleEditClick: function () {
      console.log('SelBook:', this.selectedBooking)
      if (this.selectedBooking) {
        const event = this.calendarOptions.events.find((e) => e.id === this.selectedBooking.id)
        console.log('events', event)
        if (event) {
          event.start = this.bookingDate + 'T' + this.bookingStartTime
          event.end = this.bookingDate + 'T' + this.bookingEndTime
          event.title = this.bookingName
          event.bookerEmail = this.bookingEmail
          console.log('events', this.calendarOptions.events)
        }
        localStorage.setItem('bookings', JSON.stringify(this.calendarOptions.events))
        this.closeBookingModal()
        console.log('selected booking', this.selectedBooking)
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
      // this.calendarOptions.events.push(newEvent)
      console.log('arg:', arg)
      console.log(this.calendarOptions.events)
    },

    handleDeleteClick: function (arg) {
      if (this.selectedBooking) {
        console.log('vald bokning', this.selectedBooking)
        const savedBookings = localStorage.getItem('bookings')
        if (savedBookings) {
          const bookings = JSON.parse(savedBookings)
          const updatedBookings = bookings.filter((event) => event.id !== this.selectedBooking.id)
          localStorage.setItem('bookings', JSON.stringify(updatedBookings))
          console.log('selectedBooking', this.selectedBooking)
        }
        this.calendarOptions.events = this.calendarOptions.events.filter((event) => {
          console.log('event', event)
          return event.id !== this.selectedBooking.id
        })
        this.$refs.fullcalendar.getApi().refetchEvents()
        this.closeBookingModal()
        this.deleteMessage = 'Din bokning är raderad'
      } else {
        console.log('error')
      }
    },

    editBooking: function (booking) {
      console.log('booking title', booking.title)
      this.bookingName = booking.title
      this.bookingEmail = booking.booker
      console.log('book', booking)
      this.closeBookingInfoModal()
      this.isEditing = true
      this.openBookingModal = true
      this.highlightBookedTimes()
      console.log('IsEditing:', this.isEditing)
    },

    resetEditBooking: function (booking) {
      ;(this.bookingName = ''), (this.bookingEmail = '')
    },

    handleEventClick: function (arg) {
      const event = arg.event
      this.isEditing = false
      console.log('kalle', event.extendedProps)
      this.selectedBooking = {
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        booker: event.extendedProps.bookerEmail // Lägg till bokarens namn här
      }
      console.log('handleEventClick: SelectedBooking', this.selectedBooking)
      this.bookingDate = event.startStr.split('T')[0]
      this.bookingStartTime = event.startStr.split('T')[1].substring(0, 5)
      this.bookingEndTime = event.endStr.split('T')[1].substring(0, 5)
      // this.bookingName = ''
      this.openBookingInfoModal = true
      // this.bookingEmail = ''

      // this.openBookingModal = true
      // this.handleDeleteClick(arg)
      this.setBackgroundColorOfAllOwnedEvents()
    },
    closeBookingInfoModal: function () {
      this.openBookingInfoModal = false
      // this.selectedBooking = null
      this.deleteMessage = ''
    }
  }
}
</script>

<template>
  <div class="calender-container mt-36 max-w-6xl">
    <button @click="showModal">Boka tid</button>

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
                  @mouseover="$event.target.style.backgroundColor = 'black'"
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
                  @mouseover="$event.target.style.backgroundColor = 'black'"
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

          <div class="booking-container">
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
          <div v-if="isEditing" class="booking-button">
            <button @click="handleEditClick()">Redigera bokning</button>
          </div>

          <div v-else class="booking-button">
            <button @click="submitBooking()">Boka</button>
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

          <button @click="editBooking(selectedBooking)">Redigera bokning</button>
          <button @click="handleDeleteClick">Radera bokning</button>
        </div>
        <div v-if="deleteMessage" class="deleteMessage">{{ deleteMessage }}</div>
      </div>
    </div>

    <FullCalendar ref="fullcalendar" :options="calendarOptions" />
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

.booking-buttons {
  width: 300px;
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

.time-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 4px;
}

.time-button[disabled] {
  background-color: red;
}

/* Hover-effekt */
.time-button:hover {
  background-color: blue;
}

/* Klassen för att visa att knappen är aktiv */
.button-active {
  background-color: blue;
}

.selectedBooking {
  background-color: white !important;
}

.time-button:hover,
.hovered {
  background-color: #0000ff;
}
</style>
