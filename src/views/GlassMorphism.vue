<template>
  <div class="main__wrapper">
    <div class="card">
      <form>
        <h1 class="card__title">Enter Payment Information</h1>
        <div class="card__row">
          <div class="card__col">
            <label for="cardNumber" class="card__label">Card Number</label
            ><input
              v-cleave="{
               creditCard: true,
               delimiter: '-',
               onCreditCardTypeChanged : onCreditCardTypeChanged
            }"
              type="text"
              class="card__input card__input--large"
              id="cardNumber"
              placeholder="xxxx-xxxx-xxxx-xxxx"
          />
          </div>
          <div class="card__col card__chip">
            <img src="../assets/chip.svg" alt="chip" />
          </div>
        </div>
        <div class="card__row">
          <div class="card__col">
            <label for="cardExpiry" class="card__label">Expiry Date</label
            ><input
              v-cleave="{date: true, datePattern: ['m', 'Y']}"
              type="text"
              class="card__input"
              id="cardExpiry"
              placeholder="mm/yyyy"
          />
          </div>
          <div class="card__col">
            <label for="cardCcv" class="card__label">CCV</label
            ><input
              v-cleave="{numeral: true, numeralPositiveOnly: true, numeralIntegerScale: 3}"
              type="text"
              class="card__input"
              id="cardCcv"
              placeholder="xxx"
          />
          </div>
          <div class="card__col card__brand"><i id="cardBrand" :class="cardType"></i></div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Cleave from 'cleave.js'
export default {
  name: "GlassMorphism",
  data () {
    return {
      cardType: ''
    }
  },
  directives: {
    cleave: {
      inserted: (el, binding) => {
        el.cleave = new Cleave(el, binding.value || {})
      },
      update: (el) => {
        const event = new Event('input', {bubbles: true});
        setTimeout(function () {
          el.value = el.cleave.properties.result
          el.dispatchEvent(event)
        }, 100);
      }
    }
  },
  methods: {
    onCreditCardTypeChanged (type) {
      const visa = "fa fa-cc-visa"
      const mastercard = "fa fa-cc-mastercard"
      const amex = "fa fa-cc-amex"
      const diners = "fa fa-cc-diners-club"
      const jcb = "fa fa-cc-jcb"
      const discover = "fa fa-cc-discover"

      switch (type) {
        case "visa":
          this.cardType = visa
          break;
        case "mastercard":
          this.cardType = mastercard
          break;
        case "amex":
          this.cardType = amex
          break;
        case "diners":
          this.cardType = diners
          break;
        case "jcb":
          this.cardType = jcb
          break;
        case "discover":
          this.cardType = discover
          break;
        default:
          this.cardType = ''
          break;
      }
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.main__wrapper {
  font-family: "Poppins", sans-serif;
  height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: purple url("../assets/bg.svg") center;
  overflow: hidden;
}
.card {
  background: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.05)
  );
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.5), -1px -1px 2px #aaa, 1px 1px 2px #555;
  backdrop-filter: blur(0.8rem);
  padding: 1.5rem;
  border-radius: 1rem;
  animation: 1s cubic-bezier(0.16, 1, 0.3, 1) cardEnter;
}
.card__row {
  display: flex;
  justify-content: space-between;
  padding-bottom: 2rem;
}
.card__col {
  padding-right: 2rem;
}

.card__input {
  background: none;
  border: none;
  border-bottom: dashed 0.2rem rgba(255, 255, 255, 0.15);
  font-size: 1.2rem;
  color: #fff;
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
}
.card__input--large {
  font-size: 2rem;
}

.card__input::placeholder {
  color: rgba(255, 255, 255, 0.5);
  text-shadow: none;
}

.card__input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.6);
}

.card__label {
  display: block;
  color: #fff;
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.4);
  font-weight: 400;
}
.card__title {
  font-weight: 600;
  font-size: 2.5rem;
  color: #1d005f;
  margin: 1rem 0 1.5rem;
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
}
.card__chip {
  align-self: flex-end;
}
.card__chip img {
  width: 3rem;
}
.card__brand {
  font-size: 3rem;
  color: #fff;
  min-width: 100px;
  min-height: 75px;
  text-align: right;
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.4);
}

@keyframes cardEnter {
  from {
    transform: translateY(100vh);
    opacity: 0.1;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
