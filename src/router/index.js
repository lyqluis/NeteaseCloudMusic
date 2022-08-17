import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const scrollBehavior = (to, from, savedPosition) => {
  const position = {}

  if (to.matched.some(m => m.meta.scrollToTop)) {
    return new Promise(resolve => {
      // check if any matched route config has meta that requires scrolling to top
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0
      position.y = 0

      //   // wait for the out transition to complete (if necessary)
      //   this.app.$root.$once('triggerScroll', () => {
      //     // if the resolved position is falsy or an empty object,
      //     // will retain current scroll position.
      resolve(position)
      //   })
    })
  }

  if (savedPosition) {
    return new Promise((resolve, reject) => {
      // setTimeout(() => {
      console.log(savedPosition)
      resolve(savedPosition)
      // }, 500)
    })
  }

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
    path: '/album/:id',
    name: 'Album',
    component: () => import('../views/Album.vue'),
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
  {
    path: '/newalbums',
    name: 'NewAlbums',
    component: () => import('../views/NewAlbums.vue'),
    meta: {
      scrollToTop: true
    }
  },
  {
    path: '/newsongs',
    name: 'NewSongs',
    component: () => import('../views/NewSongs.vue'),
    meta: {
      scrollToTop: true
    }
  },
  {
    path: '/ranks',
    name: 'Ranks',
    component: () => import('../views/Ranks.vue'),
    meta: {
      scrollToTop: true
    }
  },
  // todo delete
  {
    path: '/tst',
    name: 'tst',
    component: () => import('../base/tst.vue')
  },
]

const router = new VueRouter({
  routes,
  scrollBehavior
})


export default router
