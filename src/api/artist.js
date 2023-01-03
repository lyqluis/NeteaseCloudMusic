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
 * 获得歌手部分信息和热门歌曲
 * 说明 : 调用此接口 , 传入歌手 id, 可获得歌手部分信息和热门歌曲
 * 必选参数 :
 * @param {Number} id: 歌手 id, 可由搜索接口获得
 * 调用例子 : /artists?id=6452
 * @return {*}
 */
export function getArtistInfo(id) {
  return axios({
    method: 'get',
    url: '/artists',
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
 * 歌手热门 50 首歌曲
 * 说明 : 调用此接口,可获取歌手热门 50 首歌曲
 * 用在歌手首页
 * 必选参数 :
 * id : 歌手 id
 * 接口地址 : /artist/top/song
 * 调用例子 : /artist/top/song?id=6452
 * @return {*}
 */
export function getArtistTopSongs(id) {
  return axios({
    method: 'get',
    url: '/artist/top/song',
    params: { id }
  })
}

/**
 * 歌手全部歌曲
 * 说明 : 调用此接口,可获取歌手全部歌曲 
 * 用在歌手所有歌曲详情页
 * 必选参数 : 
 * id : 歌手 id
 * 可选参数 :
 * order : hot ,time 按照热门或者时间排序
 * limit: 取出歌单数量 , 默认为 50
 * offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
 * 接口地址 : /artist/songs
 * 调用例子 : /artist/songs?id=6452
 * @return {*}
 */
export function getArtistSongs(params) {
  return axios({
    method: 'get',
    url: '/artist/songs',
    params,
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

/**
 * 收藏/取消收藏歌手
 * 说明 : 调用此接口,可收藏歌手
 * 必选参数 :
 * @param {Number} params.id 歌手 id
 * @param {Number} params.t 操作, 1为收藏, 其他为取消收藏
 * 调用例子 : /artist/sub?id=6452&t=1
 * @return {*}
 */
export function subscribeArtist(params) {
  return axios({
    method: 'get',
    url: '/artist/sub',
    params,
  })
}

/**
 * 收藏的歌手列表
 * 说明 : 调用此接口,可获取收藏的歌手列表
 * 接口地址 : /artist/sublist
 * 调用例子 : /artist/sublist
 */
export function getSubscribedArtists() {
  return axios({
    method: 'get',
    url: '/artist/sublist',
  })
}