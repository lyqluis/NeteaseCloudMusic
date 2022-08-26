import Vue from 'vue'
import Vuex from 'vuex'
import player from './player'
import search from './search'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    player,
    search,
  },
  state: {
  },
  mutations: {
  },
  actions: {
  },
})
