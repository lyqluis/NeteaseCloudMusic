import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    alias: '/home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/podcast',
    name: 'Podcast',
    component: () => import('../views/Podcast.vue')
  },
  {
    path: '/library',
    name: 'Library',
    component: () => import('../views/Library.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
