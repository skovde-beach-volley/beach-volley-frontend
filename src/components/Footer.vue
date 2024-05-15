<script>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// import moment from 'moment'
export default {
  // data() {
  //   return {
  //     email: '',
  //     showPopup: false
  //   }
  // },
  // methods: {
  //   Submit() {
  //     this.showPopup = true
  //     setTimeout(() => {
  //       this.hidePopup()
  //     }, 4000)
  //   },
  //   hidePopup() {
  //     this.showPopup = false
  //   }
  // },
  // computed: {
  //   currentYear() {
  //     return moment().format('YYYY')
  //   }
  // }
}
</script>

<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="">
        <img
          id="foot-loggo"
          class="row d-flex justify-content-start"
          src="../assets/skovdebeachvolley_logo.png"
          alt="Loggo"
          width="50px"
          height="50px"
        />
        <div>Skövdebeachvolley</div>
      </div>

      <div class="row">
        <div>
          <h2>Kontakt</h2>

          <ul class="list-unstyled">
            <li>Skövdebeachvolley</li>
            <li>07010101010</li>
            <li>beachvolley@gmail.com</li>
            <li>Yadayadavägen 23</li>
            <li>22243 Yada</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="text-center p-3 copyright" style="background-color: rgba(0, 0, 0, 0.2)">
      © {{ currentYear }} Copyright:
      <a class="text-light" href="#">Skövdebeachvolley</a>
    </div>
  </footer>
</template>

<style scoped>
.footer-container {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  background-color: #8bb8e2;
}

.footer {
  width: 100%;
  /* position: fixed; */
  bottom: 0;
  left: 0;
  background-color: #8bb8e2;
  padding: 20px;
}

.row {
  align-items: center;
}
/* #foot-loggo {
  width: 150px;
  opacity: 30%;
  margin-bottom: 12px;
} */
/* li {
  font-size: small;
}
.terms-and-policy {
  color: white;
}
.copyright {
  color: white;
}

h2 {
  font-weight: bolder;
  text-decoration: underline;
  font-size: 22px;
}

h3 {
  font-size: medium;
}

#shelf-img {
  width: 90px;
  height: auto;
  margin-bottom: 20px;
  margin-left: 50px;
  position: absolute;
  bottom: 40px;
  right: 10px;
}

.pop-up {
  position: fixed;
  top: 57%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f0e8e2;
  padding: 20px;
  width: 200px;
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 999;
  color: black;
} */
/* @media (min-width: 500px) {
  #shelf-img {
    width: 130px;
  }
} */

/* @media (min-width: 688px) {
  .pop-up {
    width: auto;
    top: 50%;
  }

  #policy {
    margin-bottom: 0;
  }
  #shelf-img {
    width: 170px;
  }

  #shelf {
    display: flex;
    justify-content: right;
  } */
/* #a-container {
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: left;
    height: 70px;
  } */
/* h2 {
    font-size: 25px;
  }
} */

/* @media (min-width: 1000px) {
  #shelf-img {
    width: 200px;
  }
} */
</style>
