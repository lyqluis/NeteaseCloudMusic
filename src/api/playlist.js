import axios from 'utils/axios.js'

/**
 * 歌单分类
 * 说明 : 调用此接口,可获取歌单分类,包含 category 信息
 * @return {*}
 */
export function getPlaylistCategories() {
  return axios({
    method: 'get',
    url: '/playlist/catlist',
  })
}

export function getPlaylistHotCategories() {
  return axios({
    method: 'get',
    url: '/playlist/hot',  // 热门歌单分类
  })
}

/**
 * 歌单 ( 网友精选碟 )
 * 说明 : 调用此接口 , 可获取网友精选碟歌单
 * 可选参数 : 
 * @param {String} params.order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
 * @param {String} params.cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
 * @param {String} params.limit: 取出歌单数量 , 默认为 50
 * @param {String} params.offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
 * 接口地址 : /top/playlist
 * 调用例子 : /top/playlist?cat=华语&limit=10&order=new
 */
export function getPlaylistsByCategory(params) {
  return axios({
    method: 'get',
    url: '/top/playlist',
    params
  })
}

// 精品歌单标签列表
// 说明 : 调用此接口 , 可获取精品歌单标签列表
export function getHightQualityPlaylistCategories() {
  return axios({
    method: 'get',
    url: '/playlist/highquality/tags',  // 热门歌单分类
  })
}

/**
 * 获取精品歌单
 * 说明 : 调用此接口 , 可获取精品歌单
 * 可选参数 : 
 * @param {String} params.cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从精品歌单标签列表接口获取(/playlist/highquality/tags)
 * @param {Number} params.limit: 取出歌单数量 , 默认为 50
 * @param {Number} params.before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
 * 接口地址 : /top/playlist/highquality
 * 调用例子 : /top/playlist/highquality?before=1503639064232&limit=3
 */
export function getHighQualityPlaylistsByCategory(params) {
  return axios({
    method: 'get',
    url: '/top/playlist/highquality',
    params
  })
}

/**
 * 获取歌单详情
 * 说明 : 歌单能看到歌单名字, 但看不到具体歌单内容, 调用此接口, 传入歌单 id, 可以获取对应歌单内的所有的音乐(未登录状态只能获取不完整的歌单,登录后是完整的)，但是返回的 trackIds 是完整的，tracks 则是不完整的，可拿全部 trackIds 请求一次 song/detail 接口获取所有歌曲的详情 (https://github.com/Binaryify/NeteaseCloudMusicApi/issues/452)
 * 必选参数 : id : 歌单 id
 * 可选参数 : s : 歌单最近的 s 个收藏者,默认为 8
 * 接口地址 : /playlist/detail
 * 调用例子 : /playlist/detail?id=24381616
 * @return {Object} res: {playlist}
 */
export function getPlaylistDetail(id) {
  return axios({
    method: 'get',
    url: '/playlist/detail',
    params: { id }
  })  // todo 判断内容哪些是可以播放的

}
// 返回的歌曲列表 playlist.tracks
// tracks[0] = {
//   a: null,
//   al: {                          // 专辑信息
//     id: 136280824,
//     name: "还能对你更好",
//     pic: 109951166633633460,
//     picUrl: "http://p4.music.126.net/BahMdIBp0phz0gfcHFruXQ==/,109951166633633450.jpg",
//     pic_str: "109951166633633450",
//     tns: Array(0)
//   },
//   alia: Array(0),
//   ar: [                          // 歌手列表
//     {
//       alias: Array(0),
//       id: 50525454,
//       name: "Henryyy",
//       tns: Array(0)
//     }
//   ],
//   cd: "01",
//   cf: "",
//   copyright: 0,
//   cp: 0,
//   crbt: null,
//   djId: 0,
//   dt: 200533,
//   fee: 8,
//   ftype: 0,
//   h: Object,
//   br: 320000,
//   fid: 0,
//   size: 8023815,
//   vd: -27350,
//   id: 1914726984,
//   l: Object,
//   br: 128000,
//   fid: 0,
//   size: 3209552,
//   vd: -23109,
//   m: Object,
//   br: 192000,
//   fid: 0,
//   size: 4814306,
//   vd: -24747,
//   mark: 0,
//   mst: 9,
//   mv: 0,
//   name: "惊喜",                    // 歌曲名字
//   no: 1,                          // 歌曲序号（在专辑中）
//   noCopyrightRcmd: null,
//   originCoverType: 0,
//   originSongSimpleData: null,
//   pop: 95,
//   pst: 0,
//   publishTime: 0,
//   rt: "",
//   rtUrl: null,
//   rtUrls: Array(0),
//   rtype: 0,
//   rurl: null,
//   s_id: 0,
//   single: 0,
//   st: 0,
//   t: 0,
//   v: 5,
// }

/** 
 * 获取歌单所有歌曲
 * 说明 : 由于网易云接口限制，歌单详情只会提供 10 首歌，通过调用此接口，传入对应的歌单id，即可获得对应的所有歌曲
 * 必选参数 : id : 歌单 id
 * 可选参数 : limit : 限制获取歌曲的数量，默认值为当前歌单的歌曲数量
 * 可选参数 : offset : 默认值为0，用于歌曲的分页，计算方法为 limit * offset<= 你得到的歌曲 <= limit * (offset + 1)
 * 接口地址 : /playlist/track/all
 * 调用例子 : /playlist/track/all?id=24381616&limit=10&offset=1
 * 注：关于offset，你可以这样理解，假设你当前的歌单有100首歌
 * 你传入limit=10&offset=0等价于limit=10，你会得到第1-10首歌曲
 * 你传入limit=10&offset=1，你会得到第11-20首歌曲
 * 你设置limit=10&offset=2，你就会得到第21-30首歌曲
 * 如果offset超出最大偏移量，即超出了(歌曲数量/limit)，则offset重置为最大偏移量
*/
export function getPlaylistTrackAll({ id, limit, offset }) {
  return axios({
    method: 'get',
    url: '/playlist/track/all',
    params: { id, limit, offset }
  })
}

/**
 * 收藏/取消收藏歌单
 * 说明 : 调用此接口 , 传入类型和歌单 id 可收藏歌单或者取消收藏歌单
 * 必选参数 :
 * @param {Number} params.id : 歌单 id
 * @param {Numer} params.t: 类型, 1:收藏, 2:取消收藏 
 * 接口地址 : /playlist/subscribe
 * 调用例子 : /playlist/subscribe?t=1&id=106697785, /playlist/subscribe?t=2&id=106697785
 */
export function subscribePlaylist(params) {
  return axios({
    method: 'get',
    url: '/playlist/subscribe',
    params
  })
}
