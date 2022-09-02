import { getSongUrl, getLyric } from "../api/song"
import { shuffle } from 'utils/global'
import Vue from 'vue'

const PLAY_MODE = [
  'sequence',
  'loop',
  'shuffle',
  // 'intelligence',  // todo 心动模式
]

export default {
  namespaced: true,
  state: () => ({
    playing: false,
    loading: false,
    changing: false,
    fullScreen: false,
    showLyric: false,
    showSongList: false,
    mode: 0,
    // playlist: [],
    sequenceList: [],
    shuffledList: [],
    currentIndex: 0,
    playlistSrc: {
      id: 0,
      type: 'playlist'
    },
  }),
  getters: {
    playlist: (state, getters) => getters.currentMode === 'shuffle' ? state.shuffledList : state.sequenceList,
    currentTrack: (state, getters) => getters.playlist[state.currentIndex] || {},
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
      const list = PLAY_MODE[state.mode] === 'shuffle' ? state.shuffledList : state.sequenceList
      Vue.set(list[state.currentIndex], 'mp3', url)
    },
    setTrackLyric(state, lyric) {
      const list = PLAY_MODE[state.mode] === 'shuffle' ? state.shuffledList : state.sequenceList
      Vue.set(list[state.currentIndex], 'lyric', lyric)
    },
    setPlayingState(state, flag) {
      state.playing = flag
    },
    setFullScreen(state, flag) {
      state.fullScreen = flag
    },
    setShowLyric(state, flag) {
      state.showLyric = flag
    },
    setShowSongList(state, flag) {
      state.showSongList = flag
    },
    setSequenceList(state, list) {
      state.sequenceList = list
    },
    setShuffledList(state, list) {
      state.shuffledList = list
    },
    spliceSequenceList(state, i) {
      state.sequenceList.splice(i, 1)
    },
    setMode(state, index) {
      const n = PLAY_MODE.length
      index %= n
      state.mode = index
    },
    setCurrentIndex(state, i) {
      state.currentIndex = i
    },
    setPlaylistSrc(state, { id, type }) {
      state.playlistSrc.id = id
      state.playlistSrc.type = type
    },
  },
  actions: {
    /**
     * @func: 
     * @param {*} track
     * @param {*} list
     * @param {*} index
     */
    async play({ commit, state, getters }, { track, list, index }) {
      commit('setPlayingState', false)
      commit('setLoadingState', true)

      // set track
      if (!track) {
        track = list ? state.sequenceList[index] : getters.playlist[index]
      }

      // set playlist
      if (list) {
        if (list.length) {  // list
          list = list.slice()
          commit('setSequenceList', list)
        } else {  // true, sequencelist is setted already
          list = state.sequenceList
        }

        // set playlist by play mode
        if (getters.currentMode === 'shuffle') {
          list = shuffle(list.slice())
          commit('setShuffledList', list)
        }
      }

      // set currentIndex by play mode
      if (getters.currentMode === 'shuffle') {
        const shuffleIndex = getters.playlist.findIndex(t => t.id === track.id)
        commit('setCurrentIndex', shuffleIndex)
      } else {
        commit('setCurrentIndex', index)
      }

      // get song url & lyric
      const { id, mp3, lyric } = getters.currentTrack
      if (!lyric) {
        getLyric(id).then(parsedLyric => {
          console.log(parsedLyric);
          commit('setTrackLyric', parsedLyric)
        })
      }
      let url
      if (!mp3) {
        url = await getSongUrl(id)
        commit('setTrackUrl', url[0])
      }
      // need to set playing & loading in the @canplay
    },

    async changeMode({ dispatch, commit, state, getters }, modeName) {
      const track = getters.currentTrack
      let list = state.sequenceList
      let index = state.currentIndex

      const modeIndex = modeName ?
        PLAY_MODE.findIndex(m => m === modeName) : state.mode + 1

      commit('setMode', modeIndex)

      const mode = getters.currentMode
      if (mode === 'shuffle') {
        list = shuffle(list.slice())
        commit('setShuffledList', list)
      }
      // update current track's new index
      // do not use dispatch action cause it is async, that will cause current track auto play when current track paused when changing mode
      index = list.findIndex(t => t.id === track.id)
      commit('setCurrentIndex', index)
      // update play list
      // commit('setPlaylist', list)
    },

    deleteTrack({ state, getters, commit, dispatch }, track) {
      // delete track in sequence list & shuffle list
      const sequence = state.sequenceList.slice()
      const shuffle = state.shuffledList.slice()
      const sequenceIndex = sequence.findIndex(t => t.id === track.id)
      const shuffleIndex = shuffle.findIndex(t => t.id === track.id)
      sequence.splice(sequenceIndex, 1)
      shuffle.splice(shuffleIndex, 1)

      // 
      const isSelf = track.id === getters.currentTrack.id

      //
      const currentMode = getters.currentMode
      let currentIndex = state.currentIndex
      if (currentMode === 'shuffle') {
        if (currentIndex > shuffleIndex) currentIndex--
      } else {
        if (currentIndex > sequenceIndex) currentIndex--
      }

      commit('setSequenceList', sequence)
      commit('setShuffledList', shuffle)
      commit('setCurrentIndex', currentIndex)
      commit('setPlaylistSrc', { id: null, type: 'songlist' })

      const { playlist } = getters
      if (playlist.length) {
        if (isSelf) return dispatch('play', { index: currentIndex })
      } else {
        commit('setPlayingState', false)
      }
    },

    clearAllTracks({ commit }) {
      commit('setSequenceList', [])
      commit('setShuffledList', [])
      commit('setCurrentIndex', 0)
      commit('setPlaylistSrc', { id: null, type: 'songlist' })
      commit('setPlayingState', false)
    }
  },
}