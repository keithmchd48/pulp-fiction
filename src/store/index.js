import Vue from 'vue'
import Vuex from 'vuex'
import {storeMovies} from  '@/store/movies.store'
import {storeMenu} from '@/store/menu.store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    storeMovies,
    storeMenu
  }
})
