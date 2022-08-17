import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Icon from 'base/SvgIcon.vue'
// import VueLazyload from 'vue-lazyload'

import 'assets/scss/index.scss'
import 'assets/icons'
Vue.component('Icon', Icon)

// Vue.use(VueLazyload, {
//   // preLoad: 1.3,
//   // error: errorimage,
//   // loading: loadimage,
//   // attempt: 1
// })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')