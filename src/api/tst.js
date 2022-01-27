import axios from 'utils/axios.js'

// 首页发现全部内容
export function getFind() {
  return axios({
    url: '/homepage/block/page',
    method: 'get',
  })
}

// 轮播图
export function getBanner() {
  return axios({
    url: '/banner',
    method: 'get',
  })
}

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

// 最新专辑
export function getNewAlbums() {
  return axios({
    url: '/album/newest',
    method: 'get'
  })
}

// 新碟上架
export function getTopAlbums() {
  return axios({
    url: '/top/album',
    method: 'get'
  })
}

/**
 * 全部新碟
 * 说明 : 登录后调用此接口 ,可获取全部新碟
 * limit : 返回数量 , 默认为 30
 * offset : 偏移数量，用于分页, 如 :(页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * area : ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
 * 调用例子 : /album/new?area=KR&limit=10
 */
export function newAlbums(params) {
  return axios({
    url: '/album/new',
    method: 'get',
    params
  })
}
