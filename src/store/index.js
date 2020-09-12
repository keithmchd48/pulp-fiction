import Vue from 'vue'
import Vuex from 'vuex'
import {storeMovies} from  '@/store/movies.store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    storeMovies
  }
})
