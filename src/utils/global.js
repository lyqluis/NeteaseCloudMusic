export const BASE_DESIGN_WIDTH = 375

export function transPxToVw(px) {
  const baseWidth = BASE_DESIGN_WIDTH
  return px / baseWidth * 100
}

// val > max, return max; val < min, return min; else return val
export function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max)
}

// group array
export function chunk(arr, groupByNum) {
  const n = groupByNum
  return Array.from(Array(Math.ceil(arr.length / n))).map((_, i) => arr.slice(i * n, (i + 1) * n))
}

// 三次方 ease-out 缓动函数，制造类似橡皮筋的效果
export const easeOutCubic = (t, b, c, d) => {
  t /= d;
  t--;
  return c * (t * t * t + 1) + b;
};

// random num between min to max (includes min & max)
export function getRandomNum(min, max) {
  return ~~(Math.random() * (max - min + 1) + min)
}

// 洗牌算法
export function shuffle(arr) {
  for (let i = 0, len = arr.length; i < len; i++) {
    const j = getRandomNum(0, i)
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}


export const globalVariable = {
  NEED_ZOOM: false
}

export const SET_NEED_ZOOM = flag => {
  globalVariable.NEED_ZOOM = flag
}