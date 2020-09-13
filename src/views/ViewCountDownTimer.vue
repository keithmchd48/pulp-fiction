<template>
  <div class="main_wrapper">
    <div class="center_div">
      <h2>{{text}}<span class="blinking-cursor">|</span></h2>
      <div class="countdown_container">
        <div class="days">
          <div class="number">{{days}}</div>
          <span>days</span>
        </div>
        <div class="hours">
          <div class="number">{{hours}}</div>
          <span>hours</span>
        </div>
        <div class="minutes">
          <div class="number">{{minutes}}</div>
          <span>mins</span>
        </div>
        <div class="seconds">
          <div class="number">{{seconds}}</div>
          <span>seconds</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment/moment'
export default {
  name: 'ViewCountDownTimer',
  data () {
    return {
      totalSeconds: 0,
      text: '',
      fixedText: 'Until my next birthday:',
      index: 0,
      textInterval: null
    }
  },
  created() {
    const currYear = moment().format('YYYY')
    let bday = moment(`16-12-${currYear}`, "DD-MM-YYYY")
    if (bday <= moment()) {
      bday = moment(`16-12-${+currYear + 1}`, "DD-MM-YYYY")
    }
    bday
    this.totalSeconds = (bday - moment()) / 1000
    setInterval(() => this.countdown(), 1000)
  },
  mounted() {
    this.textInterval = setInterval(this.writeText, 100)
  },
  computed: {
    days () {
      const days = Math.floor(this.totalSeconds / 3600 / 24)
      return this.formatTime(days)
    },
    hours () {
      const hours = Math.floor(this.totalSeconds / 3600) % 24
      return this.formatTime(hours)
    },
    minutes () {
      const minutes = Math.floor(this.totalSeconds / 60) % 60
      return this.formatTime(minutes)
    },
    seconds () {
      const seconds = Math.floor(this.totalSeconds) % 60
      return this.formatTime(seconds)
    }
  },
  methods: {
    writeText () {
      this.text = this.fixedText.slice(0, this.index)
      this.index++
      if (this.index > this.fixedText.length) {
        clearInterval(this.textInterval)
      }
    },
    countdown () {
      this.totalSeconds -= 1
    },
    formatTime (num) {
      return num < 10 ? `0${num}` : num
    }
  }
}
</script>
<style scoped>
  .main_wrapper {
    background-size: cover;
    min-height: 100vh;
    background-position: center center;
    background-image: url("../assets/birthday.jpg");
    display: flex;
    justify-content: center;
  }
  .center_div {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .number {
    font-size: 4rem;
  }
  .countdown_container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .countdown_container > div {
    margin-right: 2rem;
    display: flex;
    align-items: center;
  }
/*  Blinking cursor*/
  .blinking-cursor {
    font-weight: 100;
    font-size: 30px;
    color: #2c3e50;
    -webkit-animation: 0.5s blink step-end infinite;
    -moz-animation: 0.5s blink step-end infinite;
    -ms-animation: 0.5s blink step-end infinite;
    -o-animation: 0.5s blink step-end infinite;
    animation: 0.5s blink step-end infinite;
  }

  @keyframes blink {
    from, to {
      color: transparent;
    }
    50% {
      color: #2c3e50;
    }
  }

  @-moz-keyframes blink {
    from, to {
      color: transparent;
    }
    50% {
      color: #2c3e50;
    }
  }

  @-webkit-keyframes blink {
    from, to {
      color: transparent;
    }
    50% {
      color: #2c3e50;
    }
  }

  @-ms-keyframes blink {
    from, to {
      color: transparent;
    }
    50% {
      color: #2c3e50;
    }
  }

  @-o-keyframes blink {
    from, to {
      color: transparent;
    }
    50% {
      color: #2c3e50;
    }
  }

</style>
