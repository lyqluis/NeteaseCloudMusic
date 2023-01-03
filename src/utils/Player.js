// import {Howl, Howler} from 'howler'

const playMode = {
  sequence: 1,
  shuffle: 10,
  loop: 100,
}

export default class {
  constructor() {
    this.howler = null  // todo import howler
    this.playing = false
    this.fullScreen = false
    this.list = []
    this.current = 0
    this.shuffledList = []
    this.shuffledCurrent = 0
    this.playMode = playMode.sequence

    this.init()
  }

  get mode() { return this.plaMode }
  set mode(mode) {
    if (!playMode[mode]) {
      console.warn('invalid play mode value')
      return
    }
    this.playMode = mode
  }

  get playing() { return this.playing }

  get fullScreen() { return this.fullScreen }
  set fullScreen(val) {
    this.fullScreen = val
  }

  get list() {
    return this.playMode === playMode.shuffle ? this.shuffledList : this.list
  }
  set list(list) {
    this.list = list
  }

  init(){
    // load data from local storage
    // init howler
    // 一首歌的track对应一个howl实例
    // this.howler = new Howl({})
    // recover list

  }

}