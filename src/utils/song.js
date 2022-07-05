function isPlayable(track, privileges) {
  return privileges.find(t => track.id === t.id)
}

function formateSong(src) {

}

export function spliceArtists(artists) {
  return artists.map(artist => artist.name).join(' / ')
}


export function formateProgressTime(time) {
  time = time | 0 // `| 0` 向下取整，相当于 Math.floor()
  const min = pad(time / 60 | 0)
  const second = pad(time % 60)
  return `${min}:${second}`
}

// 补位
// n - 指定位数
function pad(num, n = 2) {
  const len = num.toString().length
  while (len < n--) num = '0' + num
  return num
}
