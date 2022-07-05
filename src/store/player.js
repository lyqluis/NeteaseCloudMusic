import { getSongUrl } from "../api/song"
import Vue from 'vue'

const PLAY_MODE = {
  sequence: 1,
  loop: 10,
  once: 100,
  shuffle: 1000
}

export default {
  namespaced: true,
  state: () => ({
    playing: false,
    loading: false,
    changing: false,
    fullScreen: false,
    mode: PLAY_MODE.sequence, // sequence | loop | once | shuffle
    playlist: [],
    shuffledList: [],
    currentIndex: 0
  }),
  getters: {
    currentTrack: state => state.playlist[state.currentIndex] || {}
  },
  mutations: {
    setChangingState(state, flag) {
      state.changing = flag
    },
    setLoadingState(state, flag) {
      state.loading = flag
    },
    setTrackUrl(state, url) {
      Vue.set(state.playlist[state.currentIndex], 'mp3', url)
    },
    setPlayingState(state, flag) {
      state.playing = flag
    },
    setFullScreen(state, flag) {
      state.fullScreen = flag
    },
    setPlaylist(state, list) {
      state.playlist = list
    },
    setShuffledList(state, list) {
      state.shuffledList = list
    },
    setMode(state, mode) {
      state.mode = mode
    },
    setCurrentIndex(state, i) {
      state.currentIndex = i
    }
  },
  actions: {
    async play({ commit, state, getters }, { track, list, index }) {
      commit('setPlayingState', false)
      commit('setLoadingState', true)
      list && commit('setPlaylist', list)
      commit('setCurrentIndex', index)
      // get song url
      const { id, mp3 } = getters.currentTrack
      let url
      if (!mp3) {
        url = await getSongUrl(id)
        commit('setTrackUrl', url[0])
      }
      // need to set playing & loading in the @canplay
    }
  },
}