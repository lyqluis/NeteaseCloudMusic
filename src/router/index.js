import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return new Promise((resolve, reject) => {
      // setTimeout(() => {
      console.log(savedPosition)
      resolve(savedPosition)
      // }, 500)
    })
  }
  return { x: 0, y: 0 }
  // const position = {}

  // // scroll to anchor by returning the selector
  // if (to.hash) {
  //   position.selector = to.hash

  //   // specify offset of the element
  //   if (to.hash === '#anchor2') {
  //     position.offset = { y: 100 }
  //   }

  //   // bypass #1number check
  //   if (/^#\d/.test(to.hash) || document.querySelector(to.hash)) {
  //     return position
  //   }

  //   // if the returned position is falsy or an empty object,
  //   // will retain current scroll position.
  //   return false
  // }

  // return new Promise(resolve => {
  //   // check if any matched route config has meta that requires scrolling to top
  //   if (to.matched.some(m => m.meta.scrollToTop)) {
  //     // coords will be used if no selector is provided,
  //     // or if the selector didn't match any element.
  //     position.x = 0
  //     position.y = 0
  //   }

  //   // wait for the out transition to complete (if necessary)
  //   this.app.$root.$once('triggerScroll', () => {
  //     // if the resolved position is falsy or an empty object,
  //     // will retain current scroll position.
  //     resolve(position)
  //   })
  // })
}

const routes = [
  {
    path: '/',
    name: 'Home',
    alias: '/home',
    component: () => import('../views/Home.vue'),
    meta: {
      keepAlive: true
    },
  },
  {
    path: '/podcast',
    name: 'Podcast',
    component: () => import('../views/Podcast.vue'),
    meta: {
      keepAlive: true
    },
  },
  {
    path: '/library',
    name: 'Library',
    component: () => import('../views/Library.vue'),
    meta: {
      keepAlive: true
    },
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
    meta: {
      keepAlive: true
    },
  },
  {
    path: '/playlist/:id',
    name: 'Playlist',
    component: () => import('../views/Playlist.vue'),
  },
  {
    path: '/Rank/:id',
    name: 'Rank',
    component: () => import('../views/Playlist.vue'),
  },
  {
    path: '/artist/:id',
    name: 'Artist',
    component: () => import('../views/Artist.vue'),
    meta: {
      scrollToTop: true
    }
  },
]

const router = new VueRouter({
  routes,
  scrollBehavior
})

export default router
