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

