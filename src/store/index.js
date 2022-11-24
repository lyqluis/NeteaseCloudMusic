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
    showNotice: false, // todo
    noticeMsg: '请先绑定手机号，然后扫码登录, 请先绑定手机号，然后扫码登录',  // todo
    noticeType: 'nomal',  // normal | warn
  },
  getters: {
    showNotice: state => state.showNotice,
    noticeMsg: state => state.noticeMsg,
    noticeType: state => state.noticeType,
  },
  mutations: {
    setShowNotice(state, flag) {
      state.showNotice = flag
    },
    setNoticeMsg(state, msg) {
      state.noticeMsg = msg
    },
    setNoticeType(state, type) {
      state.noticeType = type
    }
  },
  actions: {
    openNotice({ commit }, { msg, type }) {
      msg && commit('setNoticeMsg', msg)
      type && commit('setNoticeType', type);
      (msg || type) && commit('setShowNotice', true)
    }
  },
})
