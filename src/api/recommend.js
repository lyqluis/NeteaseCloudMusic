import axios from 'utils/axios'

/**
 * @func: 每日推荐歌单
 * - limit: 取出数量 , 默认 30 (不支持 offset)
 */
 export function getRecommendList(num) {
  return axios({
    url: '/personalized',
    method: 'get',
    params: { limit: num }
  })
}

/**
 * 新歌速递
 * 必选参数 :
 * type: 地区类型 id,对应以下:
 * 全部:0
 * 华语:7
 * 欧美:96
 * 日本:8
 * 韩国:16
 * 接口地址 : /top/song
 * 调用例子 : /top/song?type=96
 */
export function getNewSongs(type = 0) {
  return axios({
    method: 'get',
    url: 'top/song',
    params: { type }
  })
}
// todo check the valid of song