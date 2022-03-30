import axios from 'utils/axios.js'

/**
 * 获取歌曲详情
 * 说明 : 调用此接口 , 传入音乐 id(支持多个 id, 用 , 隔开), 可获得歌曲详情
 * 必选参数 : ids: 音乐 id, 如 ids=347230
 * 接口地址 : /song/detail
 * 调用例子 : /song/detail?ids=347230,/song/detail?ids=347230,347231
 */
export function getSongDetail(ids) {
  return axios({
    method: 'get',
    url: '/song/detail',
    params: { ids: ids.join(',') }
  })
}