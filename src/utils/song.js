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

// ** lyric
const extractLrcRegex =
  /^(?<lyricTimestamps>(?:\[.+?\])+)(?!\[)(?<content>.+)$/gm  // m - 多行匹配
const extractTimestampRegex =
  /\[(?<min>\d+):(?<s>\d+)(?:\.|:)*(?<ms>\d+)*\]/g


export function lyricParser(lrcObj) {
  const lrc = parseLyric(lrcObj?.lrc?.lyric ?? '')
  const tlyric = parseLyric(lrcObj?.tlyric?.lyric ?? '')
  const lyric = mergeLrc(lrc, tlyric)
  return {
    lyric,
    lyricUser: lrcObj?.lyricUser,
    transUser: lrcObj?.transUser,
  }
}

/**
 * @func: 
 * @param {*} lyric
 * @return {[Object]} 
 * [
 *  { rawTime: '[00:07.55]', time: 7.055, content: '爱情啊，不要再消失了，u um' },
 *  { rawTime: '[00:14.15]', time: 14.015, content: '…' }
 * ]
 */
function parseLyric(lyric) {
  const res = []
  const matchedLyrics = lyric.trim().matchAll(extractLrcRegex)

  for (const lyric of matchedLyrics) {
    const { lyricTimestamps, content } = lyric.groups

    for (const timestamp of lyricTimestamps.matchAll(extractTimestampRegex)) {
      const rawTime = timestamp[0]  // '[03:51.46]'
      const { min, s, ms } = timestamp.groups
      const time = Number(min) * 60 + Number(s) + Number(ms ?? 0) * 0.001
      const parsedLyric = { rawTime, time, content: trim(content) }

      res.push(parsedLyric)
    }
  }

  return res
}

function trim(content) {
  const res = content.trim()
  return res.length < 1 ? content : res
}

function mergeLrc(lyric, tlyric) {
  const res = []
  for (let i = 0, j = 0, len = lyric.length; i < len; i++) {
    const l = lyric[i];
    const tl = tlyric[j];
    if (l.time === tl.time) {
      l.tcontent = tl.content
      j++
    }
    res.push(l)
  }
  return res
}
