import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

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
    {
      path: '/github-profile-viewer',
      name: 'github-profile-viewer',
      component: () => import(/* webpackChunkName: "githubprofileviewer" */ '../views/GithubProfileViewer')
    },
    {
      path: '/drawing-tool',
      name: 'drawing-tool',
      component: () => import(/* webpackChunkName: "drwaingtool" */ '../views/DrawingTool')
    },
    {
      path: '/expanding-cards',
      name: 'expanding-cards',
      component: () => import(/* webpackChunkName: "expandingcards" */ '../views/ExpandingImageCards')
    },
    {
      path: '/clock',
      name: 'clock',
      component: () => import(/* webpackChunkName: "clock" */ '../views/Clock')
    },
    {
      path: '/glassmorphism',
      name: 'glassmorphism',
      component: () => import(/* webpackChunkName: "glassmorphism" */ '../views/GlassMorphism')
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.afterEach(() => {
  store.dispatch('storeMenu/SET_MENU_ACTIVE_ACTION', false)
})
export default router
