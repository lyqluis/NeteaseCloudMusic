import Noticer from 'base/Noticer'
// import Vue from 'vue'
import { removeNode } from 'utils/dom.js'

const defaultOptions = {
  message: '',
  duaration: 0,
  value: true,
  container: 'body',
}

// const queue = []

function createInstance() {
  console.log('create noticer from', Noticer)
  const noticer = new (Vue.extend(Noticer))({
    el: document.createElement('div')
  })
  //=== noticer.$mount(document.createElement('div'))
  console.log('create noticer ', noticer)

  noticer.$on('input', value => {
    noticer.value = value
  })

  // remove node & detroy instance after leaving <transition> ends
  noticer.$on('closed', () => {
    removeNode(noticer.$el)
    noticer.$destroy()
  })

  // queue.push(noticer)

  return noticer
}

function parseOptions(options) {
  if (typeof options === 'string') {
    options = { message: options }
  }
  return {
    ...defaultOptions,
    ...options,
  }
}

function Notice(options) {
  const noticer = createInstance()

  options = parseOptions(options)

  // open toast
  Object.assign(noticer, options)

  // add close function
  noticer.close = () => {
    noticer.value = false
    clearTimeout(noticer.timer)
  }

  // auto close
  const { duration } = noticer
  if (duration) {
    noticer.timer = setTimeout(() => {
      noticer.close()
    }, duration);
  }

  return noticer
}

Vue.prototype.$notice = Notice

export default Notice