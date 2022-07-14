import { getSongUrl } from "../api/song"
import { shuffle } from 'utils/global'
import Vue from 'vue'

const PLAY_MODE = [
  'sequence',
  'loop',
  'shuffle',
]

export default {
  namespaced: true,
  state: () => ({
    playing: false,
    loading: false,
    changing: false,
    fullScreen: false,
    mode: 0,
    playlist: [],
    sequenceList: [],
    shuffledList: [],
    currentIndex: 0
  }),
  getters: {
    currentTrack: state => state.playlist[state.currentIndex] || {},
    currentMode: state => PLAY_MODE[state.mode]
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
    setSequenceList(state, list) {
      state.sequenceList = list
    },
    setShuffledList(state, list) {
      state.shuffledList = list
    },
    setMode(state, index) {
      const n = PLAY_MODE.length
      index %= n
      state.mode = index
    },
    setCurrentIndex(state, i) {
      state.currentIndex = i
    }
  },
  actions: {
    async play({ commit, state, getters }, { track, list, index }) {
      commit('setPlayingState', false)
      commit('setLoadingState', true)
      // adjust params
      if (!track) {
        track = list ? list[index] : state.playlist[index]
      }
      // set playlist by play mode
      if (list) {
        if (list.length > state.sequenceList.length) {
          list = list.slice()
          commit('setSequenceList', list)
        } else {
          list = state.sequenceList
        }
        
        if (getters.currentMode === 'shuffle') {
          list = shuffle(list.slice())
          commit('setShuffledList', list)
        }
        commit('setPlaylist', list)
      }

      // set currentIndex by play mode
      if (getters.currentMode === 'shuffle') {
        const shuffleIndex = state.playlist.findIndex(t => t.id === track.id)
        commit('setCurrentIndex', shuffleIndex)
      } else {
        commit('setCurrentIndex', index)
      }
      // get song url
      const { id, mp3 } = getters.currentTrack
      let url
      if (!mp3) {
        url = await getSongUrl(id)
        commit('setTrackUrl', url[0])
      }
      // need to set playing & loading in the @canplay
    },

    async changeMode({ dispatch, commit, state, getters }) {
      commit('setMode', state.mode + 1)
      const mode = PLAY_MODE[state.mode]
      let list = state.sequenceList
      let index = state.currentIndex
      if (mode === 'shuffle') {
        list = shuffle(list.slice())
        commit('setShuffledList', list)
      }
      // update new current track index
      // do not use dispatch action cause it is async, that will cause current track auto play when current track paused when changing mode
      index = list.findIndex(t => t.id === getters.currentTrack.id)
      commit('setCurrentIndex', index)
      // update play list
      commit('setPlaylist', list)
    },
  },
}