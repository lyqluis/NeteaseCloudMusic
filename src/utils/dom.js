export function addClass(el, className) {
  // el.classList.add(className)
  if (hasClass(el, className)) return
  const classes = el.className.split(' ')
  classes.push(className)
  el.className = classes.join(' ')
}

export function hasClass(el, className) {
  // 开头/空白字符 + classname + 空白字符/结尾
  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function removeClass(el, className) {
  if (hasClass(el, className)) {
    const reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    el.className = el.className.replace(reg, '')
    // el.classList.remove(className)
  }
}

export function getStyle(el, prop) {
  return window.getComputedStyle(el)[prop]
}


export function bindEvent(el, eventName, callback, options) {
  el.addEventListener(eventName, callback, options)
}

export function removeEvent(el, eventName, callback, options) {
  el.removeEventListener(eventName, callback, options)
}

export function preventDefault(event, isStopPropagation) {
  event.preventDefault()
  isStopPropagation && event.stopPropagation()
}

export function getDOMRect(el) {
  // element
  if (el.getBoundingClientRect) return el.getBoundingClientRect()
  // window
  return {
    top: 0,
    bottom: el.innerHeight
  }
}

// 滚动元素需要在css中显性标记
export function getScroller(el, root = window) {
  const overflowScrollReg = /scroll|auto/i;
  while (el &&
    el.tagName !== 'HTML' &&
    el.tagName !== 'BODY' &&
    el.nodeType === 1 &&
    el !== root
  ) {
    const { overflowY } = window.getComputedStyle(el)
    if (overflowScrollReg.test(overflowY)) return el
    el = el.parentNode
  }
  return root
}

export function getScrollTop(el) {
  const { scrollTop } = el
  return scrollTop ?? window.scrollY
}

export function scrollTo(el, top) {
  if (el === window) {
    window.scrollTo({ top })
  } else {
    el.scrollTop = top
  }
}

export function observeResize(el, fn, unobserve = false) {
  const observer = new ResizeObserver(fn)
  if (unobserve) {
    observer.unobserve(el)
    return
  }
  observer.observe(el)
}

export function getElement(selector) {
  if (typeof selector === 'string') {
    return document.querySelector(selector)
  }
}

export function removeNode(el) {
  const parent = el.parentNode
  if (parent) {
    parent.removeChild(el)
  }
}