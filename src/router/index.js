import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from '../views/LandingPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/mainPage',
    name: 'MainPage',
    component: () => import('../views/MainPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const auth = localStorage.access_token
  console.log(auth)
  if (to.name === 'MainPage' && !auth) {
    next({ name: 'LandingPage' })
  } else if (to.name === 'LandingPage' && auth) {
    next(({ name: 'MainPage' }))
  } else {
    next()
  }
})

export default router
