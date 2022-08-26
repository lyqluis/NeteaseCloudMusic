import { getHistory, saveKeyword, deleteHistory } from 'utils/cache'

export default {
  namespaced: true,
  state: () => ({
    searchHistory: getHistory(),
  }),
  mutations: {
    setSearchHistory(state, history) {
      state.searchHistory = history
    }
  },
  actions: {
    saveSearchHistory({ commit }, keyword) {
      commit('setSearchHistory', saveKeyword(keyword))
    },
    deleteSearchHistory({ commit }) {
      commit('setSearchHistory', deleteHistory())
    }
  }
}