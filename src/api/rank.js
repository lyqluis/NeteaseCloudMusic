import axios from 'utils/axios.js'

/**
 * 获取歌单详情
 * 说明 : 调用此接口,可获取所有榜单
 * @return {Object} res
 * @return {Object} res.artistToplist
 * @return {Array} res.list
 */
export function getRanks() {
  return axios({
    method: 'get',
    url: '/toplist',
  })

}