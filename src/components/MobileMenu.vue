<template>
  <div class="side-menu-layout" :class="{'active': menuActive}">
    <div><i @click="SET_MENU_ACTIVE_ACTION(false)" class="fa fa-times"></i></div>
    <div id="mobile_nav">
      <router-link :to="{name: 'count-down-timer'}">CountDown</router-link>
      <router-link :to="{name: 'movie-search'}">MovieSearch</router-link>
      <router-link :to="{name: 'github-profile-viewer'}">GithubProfile</router-link>
<!--      <router-link :to="{name: 'drawing-tool'}">Sketch</router-link>-->
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name: "MobileMenu",
    computed: {
      ...mapState('storeMenu', ['menuActive'])
    },
    methods: {
      ...mapActions('storeMenu', ['SET_MENU_ACTIVE_ACTION'])
    }
  }
</script>

<style scoped>
  .fa-times {
    font-size: 2rem;
    color: white;
    padding: 0.3rem;
  }
  #mobile_nav {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 0 2rem;
    width: 100%;
  }
  #mobile_nav a {
    font-weight: bold;
    color: #eeeeee;
    text-decoration: none;
    margin-top: 1rem;
  }

  #mobile_nav a.router-link-exact-active {
    color: #42b983;
  }
  @media only screen and (min-width: 427px) {
    .side-menu-layout {
      display: none;
    }
  }
  @media only screen and (max-width: 426px) {
    .side-menu-layout {
      background-color: #2c3e50;
      height: 100%;
      width: 50% !important;
      z-index: 8 !important;
      position: absolute !important;
      transition: 1s !important;
      overflow-y: scroll !important;
      left: -100%;
    }
    .active {
      left: 0;
    }
  }
</style>
