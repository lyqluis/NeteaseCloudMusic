import Vue from 'vue'
import App from './App.vue'

import 'assets/scss/index.scss'
import 'assets/icons'
import Icon from '@/components/svgIcon.vue'
Vue.component('Icon', Icon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
