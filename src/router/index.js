import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'count-down-timer',
      component: () => import(/* webpackChunkName: "countdowntimer" */ '../views/ViewCountDownTimer.vue')
    },
    {
      path: '/movie-search',
      name: 'movie-search',
      component: () => import(/* webpackChunkName: "moviesearch" */ '../views/MovieSearch.vue')
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
