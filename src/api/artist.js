import axios from 'utils/axios'
/**
 * 歌手榜
 * 说明 : 调用此接口 , 可获取排行榜中的歌手榜
 * - type : 地区
 * 1: 华语
 * 2: 欧美
 * 3: 韩国
 * 4: 日本
 * @param {number} type
 */
export function toplistOfArtists(type = null) {
  let params = {};
  if (type) {
    params.type = type;
  }
  return axios({
    url: '/toplist/artist',
    method: 'get',
    params,
  });
}

/**
 * 热门歌手
 * 说明 : 调用此接口 , 可获取热门歌手数据
 * 可选参数 : 
 * - limit: 取出数量 , 默认为 50
 * - offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
 * 调用例子 : /top/artists?offset=0&limit=30
 */
export function getTopArtists(params){
  return axios({
    method: 'get',
    url: '/top/artists',
    params
  })
}