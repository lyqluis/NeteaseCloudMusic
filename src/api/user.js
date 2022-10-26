import axios from 'utils/axios'

/**
 * 获取用户信息 , 歌单，收藏，mv, dj 数量
 * 说明 : 登录后调用此接口 , 可以获取用户信息
 * 接口地址 : /user/subcount
 * 调用例子 : /user/subcount
 * @return {Object}
 * artistCount: 0
 * code: 200
 * createDjRadioCount: 0
 * createdPlaylistCount: 15
 * djRadioCount: 0
 * mvCount: 0
 * newProgramCount: 0
 * programCount: 0
 * subPlaylistCount: 63
 */
export function getUserSubcount() {
  return axios({
    url: '/user/subcount',
    method: 'get',
  });
}

/**
 * 获取用户歌单
 * 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户歌单
 * 必选参数
 * @param {Object} params.uid 用户 id
 * 可选参数 :
 * @param {Object} params.limit : 返回数量 , 默认为 30
 * @param {Object} params.offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * 接口地址 : /user/playlist
 * 调用例子 : /user/playlist?uid=32953014
 */
export function getUserPlaylists(params) {
  return axios({
    url: '/user/playlist',
    method: 'get',
    params,
  });
}
