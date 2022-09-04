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
    method: 'get',
    url: '/toplist/artist',
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
export function getTopArtists(params) {
  return axios({
    method: 'get',
    url: '/top/artists',
    params
  })
}

/**
 * 获取歌手详情
 * 说明 : 调用此接口 , 传入歌手 id, 可获得获取歌手详情
 * 必选参数 : id: 歌手 id
 * 接口地址 : /artist/detail
 * 调用例子 : /artist/detail?id=11972054 (Billie Eilish)
 * @param {Number} id
 * @return {*}
 */
export function getArtistDetail(id) {
  return axios({
    method: 'get',
    url: '/artist/detail',
    params: { id }
  })
}

/**
 * 获取歌手描述
 * 说明 : 调用此接口 , 传入歌手 id, 可获得歌手描述
 * 必选参数 : id: 歌手 id
 * 接口地址 : /artist/desc
 * 调用例子 : /artist/desc?id=6452 ( 周杰伦 ) 
 * @param {Number} id
 * @return {*}
 */
export function getArtistDes(id) {
  return axios({
    method: 'get',
    url: '/artist/desc',
    params: { id }
  })
}

/**
 * 获取歌手专辑
 * 说明 : 调用此接口 , 传入歌手 id, 可获得歌手专辑内容
 * 必选参数 : id: 歌手 id
 * 可选参数 : limit: 取出数量 , 默认为 30
 * offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0
 * 接口地址 : /artist/album
 * 调用例子 : /artist/album?id=6452&limit=5 ( 周杰伦 )
 * @param {Object} params
 * @return {*}
 */
export function getArtistAlbums(params) {
  return axios({
    method: 'get',
    url: '/artist/album',
    params,
  })
}

/**
 * 获取相似歌手
 * 说明 : 调用此接口 , 传入歌手 id, 可获得相似歌手
 * 必选参数 : id: 歌手 id
 * 接口地址 : /simi/artist
 * 调用例子 : /simi/artist?id=6452 ( 对应和周杰伦相似歌手 )
 * @param {*} id
 * @return {*}
 */
export function getSimilarArtist(id) {
  return axios({
    method: 'get',
    url: '/simi/artist',
    params: { id }
  })
}