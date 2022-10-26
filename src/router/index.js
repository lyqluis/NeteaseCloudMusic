import Vue from 'vue'
import VueRouter from 'vue-router'

// 缓存原本的push方法
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace

// 指定新的push方法
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  // 如果指定了成功或者失败的回调
  if (onResolve || onReject) {
    // 直接调用原本的push方法
    // * 不能直接调用，因为打包成为严格模式下this不是router而是undefined
    // originalPush(location, onResolve, onReject)
    return originalPush.call(this, location, onResolve, onReject)
  }
  // 没有指定成功或者失败的回调，要用catch处理
  return originalPush.call(this, location).catch((err) => {
    // 如果是重复导航产生的错误，不再向外传递错误
    if (VueRouter.isNavigationFailure(err)) {
      // 产生的是成功的promise，成功的promise的value是err
      // 产生失败的promise：抛出错误或者return一个失败的promise
      return err
    }

    // 如果不是重复导航的错误，将错误向下传递
    return Promise.reject(err)
  })
}

VueRouter.prototype.replace = function (location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalReplace.call(this, location, onResolve, onReject)
  }
  return originalReplace.call(this, location).catch((err) => {
    if (VueRouter.isNavigationFailure(err)) {
      return err
    }
    return Promise.reject(err)
  })
}

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
      setTimeout(() => {
        resolve(position)
      }, 500);
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
    path: '/radio',
    name: 'Radio',
    component: () => import('../views/Radio.vue'),
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
    path: '/podcast/:id',
    name: 'Podcast',
    component: () => import('../views/Podcast.vue'),
  },
  {
    // todo lowercase
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
    path: '/morealbums/:id',  // 艺人 => 更多专辑
    name: 'MoreAlbums',
    component: () => import('../views/MoreAlbums.vue'),
    meta: {
      scrollToTop: true
    }
  },
  {
    path: '/moresongs/:id',
    name: 'MoreSongs',
    component: () => import('../views/MoreSongs.vue'),
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
    path: '/allpodcasts',
    name: 'AllPodcasts',
    component: () => import('../views/AllPodcasts.vue'),
    meta: {
      scrollToTop: true
    }
  },
  {
    path: '/hotpodcasts',  // 电台 - 热门电台 => 更多
    name: 'HotPodcasts',
    component: () => import('../views/MoreAlbums.vue'),
    meta: {
      scrollToTop: true
    }
  },
  {
    path: '/hotpodcastprograms',  // 电台 - 热门节目 => 更多
    name: 'HotPodcastsPrograms',
    component: () => import('../views/MoreSongs.vue'),
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
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      scrollToTop: true
    }
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User.vue'),
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
