import { getUserInfo, saveUserInfo, removeUserInfo } from "@/utils/cache"
import { isLoggedIn, checkServerLoginStatus } from "@/utils/auth"

export default {
  namespaced: true,
  state: () => ({
    initChecked: false,
    isLoggedIn: isLoggedIn(),
    userInfo: getUserInfo(),
  }),
  getters: {
    account: state => state.userInfo.account,
    profile: state => state.userInfo.profile
  },
  mutations: {
    setInitCheck(state, flag) {
      state.initChecked = flag
    },
    setLoginStatus(state, flag) {
      state.isLoggedIn = flag
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
  },
  actions: {
    async initCheckLoginStatus({ commit, dispatch }) {
      console.log('🔒 init check login status')
      commit('setInitCheck', true)
      const userInfo = await checkServerLoginStatus()
      const isServerLoggedIn = userInfo.account !== null
      if (isServerLoggedIn) {
        console.log('🔒 checked server logged in')
        await dispatch('handleLogin', userInfo)
      } else {
        console.log('🔒 checked server logged out')
        await dispatch('handleLogout')
      }
    },

    handleLogin({ commit }, userInfo) {
      commit('setLoginStatus', true)
      commit('setUserInfo', saveUserInfo(userInfo))
    },

    handleLogout({ commit }) {
      commit('setLoginStatus', false)
      commit('setUserInfo', removeUserInfo())
    },

    // just check local login status
    async checkLoginStatus({ state, dispatch }) {
      if (!state.initChecked) {
        await dispatch('initCheckLoginStatus')
        return
      }
      console.log('🔒 checked local login status')
      return isLoggedIn()
    }
  }
}