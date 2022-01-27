export function addClass(el, className) {
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

export function bindEvent(el, eventName, callback) {
  el.addEventListener(eventName, e => callback(e))
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