// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Icon from 'base/SvgIcon.vue'

import 'assets/scss/index.scss'
import 'assets/icons'
Vue.component('Icon', Icon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')