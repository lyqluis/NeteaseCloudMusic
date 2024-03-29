import axios from 'utils/axios.js'
import { lyricParser } from 'utils/song'

/**
 * 获取歌曲详情
 * 说明 : 调用此接口 , 传入音乐 id(支持多个 id, 用 , 隔开), 可获得歌曲详情
 * 必选参数 : ids: 音乐 id, 如 ids=347230
 * 接口地址 : /song/detail
 * 调用例子 : /song/detail?ids=347230,/song/detail?ids=347230,347231
 * @return {Array} privileges
 * @return {Array} songs
 * }
 */
export function getSongDetail(ids) {
  return axios({
    method: 'get',
    url: '/song/detail',
    params: { ids: ids.join(',') }
  })
}

/**
 * 获取音乐 url
 * 说明 : 使用歌单详情接口后 , 能得到的音乐的 id, 但不能得到的音乐 url, 调用此接口, 传入的音乐 id( 可多个 , 用逗号隔开 ), 可以获取对应的音乐的 url,
 * !!!未登录状态返回试听片段(返回字段包含被截取的正常歌曲的开始时间和结束时间)
 * @param {string} id - 音乐的 id，例如 id=405998841,33894312
 * 返回对应 [object]
 */
export function getSongUrl(id) {
  const getBr = () => {
    // 当返回的 quality >= 400000时，就会优先返回 hi-res
    // const quality = store.state.settings?.musicQuality ?? '320000';
    // return quality === 'flac' ? '350000' : quality;
  };

  return axios({
    url: '/song/url',
    method: 'get',
    params: {
      id,
      // br: '350000',
    },
  }).then(
    res => res.data
  );
}

/**
 * 获取歌词
 * 说明 : 调用此接口 , 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )
 * @param {Number} id - 音乐 id
 * @return {[Object]}
 * {
 *  code: 200
 *  klyric: {Object}
 *  lrc: {
 *    version: 8, 
 *    lyric: {String}
 *  },
 *  lyricUser: {Object}
 *  qfy: false
 *  sfy: false
 *  sgc: false
 *  tlyric: {
 *    version: 5, 
 *    lyric: '[by:andy0613]\n[00:07.55]爱情啊，不要再消失了，u um\n[00:14.15]…[03:44.96]爱情啊，不要再消失了，u um\n[03:51.46]我需要你，一直在寻找着你\n'
 *  }
 *  transUser: {Object}
 * }
 */
export function getLyric(id) {
  return axios({
    url: '/lyric',
    method: 'get',
    params: { id },
  }).then(res => {
    return lyricParser(res)
  });
}
