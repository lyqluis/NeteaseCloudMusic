import Vue from "vue"
import Overlay from 'base/Overlay.vue'


class OverlayControl {
  constructor() {
    this.zIndex = 1000
    this.stack = []
  }
  // 更新overlay dom 元素
  updateOverlay(vm) {
    // get overlay matched vm
    const ctx = this.stack.find(item => item.vm === vm)
    if (ctx) {
      const el = vm.$el
      const { overlay, config } = ctx

      // insert overlay node
      if (el && el.parentNode) {
        el.parentNode.insertBefore(overlay.$el, el)
      }

      // open overlay
      // config里面包含了overlay的props的z-index属性，属性show控制了overlay的v-show
      Object.assign(overlay, config, { show: true })
    }

  }

  openOverlay(vm, config) {
    const ctx = this.stack.find(item => vm === item.vm)
    // 更新配置
    if (ctx) {
      ctx.config = config
    } else {
      // 创建overlay实例
      const overlay = this.mountOverlay(vm)
      // 绑定弹窗组件实例、配置进ctx
      this.stack.push({ vm, overlay, config })
    }
    // 更新遮罩层
    this.updateOverlay(vm)
  }

  closeOverlay(vm) {
    const ctx = this.stack.find(item => vm === item.vm)
    // close overlay
    ctx.overlay.show = false
  }

  // overlay.vue是一个vue文件，没法变成一个函数，使用overlay-render.js，因为导出了一个js函数
  mountOverlay(vm) {
    return mount(Overlay, {
      // on 事件监控
      on: {
        click() {
          vm.close()
        }
      }
    })

  }
}

function mount(Component, vnodeData) {
  const instance = new Vue({
    el: document.createElement('div'),
    props: Component.props,
    render(h) {
      return h(Component, {
        props: this.$props,
        ...vnodeData,
      })
    }
  })
  return instance
}

const overlayControl = new OverlayControl()

import { onTouchStart, onTouchMove } from "utils/touch"
import { addClass, removeClass, bindEvent, removeEvent, getScroller, preventDefault } from "utils/dom"

/**
 * use in Popup component
 */
export const popupMixin = {
  data() {
    return {
      opened: false,  // todo 不是响应式数据
      zIndex: 0,
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    }
  },
  watch: {
    value(isShow) {
      if (isShow) {
        // open overlay
        console.log("open overlay");
        this.open()
      } else {
        // close overlay
        console.log("close overlay");
        this.close()
      }
    },
  },
  methods: {
    open() {
      this.opened = true
      this.renderOverlay()
      this.lockTouchMove()
    },
    close() {
      if (!this.opened) return
      this.opened = false
      overlayControl.closeOverlay(this)
      this.unlockTouchMove()
      this.$emit('input', false)
    },
    renderOverlay() {
      // update z-index
      this.$el.style.zIndex = overlayControl.zIndex + 1
      overlayControl.openOverlay(this, { zIndex: overlayControl.zIndex })
    },
    lockTouchMove() {
      addClass(document.body, 'overlay-overflow-hidden')
      // add touch event callback to be comptible with IOS
      bindEvent(document.body, 'touchstart', onTouchStart, { capture: false, passive: false })
      bindEvent(document.body, 'touchmove', this.handleTouchMove, { capture: false, passive: false })
    },
    unlockTouchMove() {
      removeClass(document.body, 'overlay-overflow-hidden')
      removeEvent(document.body, 'touchstart', onTouchStart)
      removeEvent(document.body, 'touchmove', this.handleTouchMove)
    },
    handleTouchMove(e) {
      const { drag } = onTouchMove(e)
      const direction = drag.deltaY > 0 ? 'top' : 'bottom'
      const el = getScroller(e.target, this.$el)
      const { scrollHeight, scrollTop, offsetHeight } = el
      // 滑动超出popup部分禁止滑动
      if ((direction === 'top' && scrollTop === 0) ||
        (direction === 'bottom' && scrollTop + offsetHeight >= scrollHeight)) {
        preventDefault(e, true)
      }
    },
    // handleTouchEnd(e) {
    //   resetTouch()
    // }

  }
}

/**
 * use in thhe components used Popup
 */
export const handlePopup = {
  data() {
    return {
      show: false
    }
  },
  methods: {
    openPopup(e) {
      this.show = true;
    },
  }
}
