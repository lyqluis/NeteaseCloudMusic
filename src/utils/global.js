export const BASE_DESIGN_WIDTH = 375

export function transPxToVw(px) {
  const baseWidth = BASE_DESIGN_WIDTH
  return px / baseWidth * 100
}

// val < min, return min; val > max, return max; else return val
export function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max)
}