import { getUserInfo, saveUserInfo, removeUserInfo } from "@/utils/cache"
import { isLoggedIn, } from "@/utils/auth"

export default {
  namespaced: true,
  state: () => ({
    isLoggedIn: isLoggedIn(),
    userInfo: getUserInfo(),
  }),
  getters: {
    account: state => state.userInfo.account,
    profile: state => state.userInfo.profile
  },
  mutations: {
    setLoginStatus(state, flag) {
      state.isLoggedIn = flag
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
  },
  actions: {
    handleLogin({ commit }, userInfo) {
      commit('setLoginStatus', true)
      commit('setUserInfo', saveUserInfo(userInfo))
    },

    handleLogout({ commit }) {
      commit('setLoginStatus', false)
      commit('setUserInfo', removeUserInfo())
    },
    // todo when cookie is outdated
    checkLogInfo(){
      if(!isLoggedIn()){
        return
      }
    }
    // todo when isLoggedIn (has cookie), no local storage
  }
}