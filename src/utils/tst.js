const str = '[by:andy0613]\n[00:07.55]爱情啊，不要再消失了，u um\n[00:14.15]…\n[03:44.96]爱情啊，不要再消失了，u um\n[03:51.46]我需要你，一直在寻找着你\n'

const extractLrcRegex =
  /^(?<lyricTimestamps>(?:\[.+?\])+)(?!\[)(?<content>.+)$/gm  // m - 多行匹配
const extractTimestampRegex =
  /\[(?<min>\d+):(?<s>\d+)(?:\.|:)*(?<ms>\d+)*\]/g


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

const res = parseLyric(str)

console.log(res);

