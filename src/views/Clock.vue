<template>
  <div>
    <article class="clock">
      <div class="hours-container">
        <div id="hourHand" class="hours"></div>
      </div>
      <div class="minutes-container">
        <div id="minHand" class="minutes"></div>
      </div>
      <div class="seconds-container">
        <div id="secHand" class="seconds"></div>
      </div>
    </article>
  </div>
</template>

<script>
import moment from 'moment/moment'
export default {
  name: "Clock",
  data() {
    return {
      interval: null
    }
  },
  mounted() {
    this.clock()
    this.interval = setInterval(this.clock, 1000);
  },
  methods: {
    clock() {
      const HOURS = document.getElementById('hourHand')
      const MINS = document.getElementById('minHand')
      const SEC = document.getElementById('secHand')
      const currentTime = moment()
      const currentHours = currentTime.hours() % 12
      const currentMins = currentTime.minutes()
      const currentSec = currentTime.seconds()
      const hoursAngle = (360 * (currentHours * 60 * 60)) / 43200
      const hoursMinutesAngle = (360 * (currentMins * 60)) / 43200
      const hoursSecondsAngle = (360 * currentSec) / 43200
      const totalHoursAngle = hoursAngle + hoursMinutesAngle + hoursSecondsAngle
      HOURS.style.transform = `rotateZ(${totalHoursAngle}deg)`
      const minsAngle = (360 * (currentMins * 60)) / 3600
      const minsSecondsAngle = (360 * (currentSec)) / 3600
      const totalMinsAngle = minsAngle + minsSecondsAngle
      MINS.style.transform = `rotateZ(${totalMinsAngle}deg)`
      const totalSecAngle = (360 * currentSec) / 60
      SEC.style.transform = `rotateZ(${totalSecAngle}deg)`
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>

<style scoped>
.hours {
  background: #000;
  height: 84px;
  left: 50vw;
  position: absolute;
  top: 40%;
  /* transform-origin: 50% 100%; */
  transform-origin: center bottom;
  width: 0.5%;
}
.minutes {
  background: #000;
  height: 150px;
  left: 50vw;
  position: absolute;
  top: 32%;
  /* transform-origin: 50% 100%; */
  transform-origin: center bottom;
  width: 0.5%;
}
.seconds {
  background: red;
  height: 203px;
  left: 50.3vw;
  position: absolute;
  top: 28%;
  transform-origin: 50% 92%;
  width: 0.3%;
  /*z-index: 8;*/
}

</style>
