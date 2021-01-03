<template>
  <div id="app">
    <i @click="SET_MENU_ACTIVE_ACTION(true)" class="fa fa-bars"></i>
    <MobileMenu></MobileMenu>
    <div id="nav">
      <router-link :to="{name: 'count-down-timer'}">CountDown</router-link>
      <router-link :to="{name: 'movie-search'}">MovieSearch</router-link>
      <router-link :to="{name: 'github-profile-viewer'}">GithubProfile</router-link>
      <router-link :to="{name: 'drawing-tool'}">Sketch</router-link>
      <router-link :to="{name: 'expanding-cards'}">ExpandCards</router-link>
      <router-link :to="{name: 'clock'}">Clock</router-link>
      <router-link :to="{name: 'glassmorphism'}">Glassmorphism</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import MobileMenu from "@/components/MobileMenu"
  import {mapActions} from "vuex";
  export default {
    components: {MobileMenu},
    methods: {
      ...mapActions('storeMenu', ['SET_MENU_ACTIVE_ACTION'])
    }
  }
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}
.fa-bars {
  display: none;
  position: fixed;
  font-size: 1.6rem;
  top: 17px;
  left: 12px;
  z-index: 3;
  color: #2c3e50;
}
body {
  margin: 0;
}

#nav {
  padding: 30px;
  background-color: #2c3e50;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

#nav a {
  font-weight: bold;
  color: #eeeeee;
  margin-left: 13px;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
  * {
    box-sizing: border-box;
  }
@media only screen and (max-width: 426px) {
  #nav {
    display: none;
  }
  .fa-bars {
    display: block;
  }
}
@media only screen and (max-width: 768px) {
  #nav > *:nth-child(4) {
    display: none;
  }
}
</style>
