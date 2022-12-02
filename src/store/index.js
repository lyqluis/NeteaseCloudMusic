import Vue from 'vue'
import Vuex from 'vuex'
import player from './player'
import search from './search'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    player,
    search,
    user
  },
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
})
