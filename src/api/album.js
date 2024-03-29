import axios from 'utils/axios'

/**
 * 全部新碟
 * 说明 : 登录后调用此接口 ,可获取全部新碟
 * @param {Object} params
 * - limit : 返回数量 , 默认为 30
 * - offset : 偏移数量，用于分页, 如 :(页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * - area : ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
 * 调用例子 : /album/new?area=KR&limit=10
 */
export function getNewAlbums(params) {
  return axios({
    method: 'get',
    url: '/album/new',
    params
  })
}

/**
 * 专辑动态信息
 * 说明 : 调用此接口 , 传入专辑 id, 可获得专辑动态信息,如是否收藏,收藏数,评论数,分享数
 * 必选参数 : 
 * @param {Number} id: 专辑 id
 * 接口地址 : /album/detail/dynamic
 * 调用例子 : /album/detail/dynamic?id=32311
 */
export function getAlbumDetailDynamic(id) {
  return axios({
    method: 'get',
    url: '/album/detail/dynamic',
    params: { id }
  })
}

/**
 * 获取专辑内容
 * 说明 : 调用此接口 , 传入专辑 id, 可获得专辑内容
 * @param {number} id
 * 返回的 songs 中包含歌曲 url 和 privilege
 */
export function getAlbumDetail(id) {
  return axios({
    method: 'get',
    url: '/album',
    params: { id }
  })
}
// todo check if the song playable

// 返回的歌曲列表 songs
// songs[0] = {
//   "rtUrls": [],
//   "ar": [                            // 歌手列表
//     {
//       "id": 12977,
//       "name": "逃跑计划",
//       "alia": [
//         "Escape Plan"
//       ]
//     }
//   ],
//   "al": {                            // 专辑信息
//     "id": 2285010,
//     "name": "世界",
//     "picUrl": "https://p2.music.126.net/Eef2K2KV9dT3XUA6_Ve-Rw==/109951165543196748.jpg",
//     "pic_str": "109951165543196748",
//     "pic": 109951165543196750
//   },
//   "st": 1,
//   "noCopyrightRcmd": null,
//   "songJumpInfo": null,
//   "no": 1,
//   "fee": 8,
//   "djId": 0,
//   "cd": "1",
//   "a": null,
//   "m": {
//     "br": 192000,
//     "fid": 0,
//     "size": 5192350,
//     "vd": -3800
//   },
//   "crbt": null,
//   "rtUrl": null,
//   "ftype": 0,
//   "rtype": 0,
//   "rurl": null,
//   "pst": 0,
//   "alia": [],
//   "pop": 95,
//   "rt": "600902000009535416",
//   "mst": 9,
//   "cp": 22036,
//   "cf": "",
//   "dt": 216000,
//   "h": {
//     "br": 320000,
//     "fid": 0,
//     "size": 8653888,
//     "vd": -6300
//   },
//   "l": {
//     "br": 128000,
//     "fid": 0,
//     "size": 3461581,
//     "vd": -3200
//   },
//   "mv": 0,
//   "t": 0,
//   "v": 28,
//   "name": "Is This Love",            // 歌曲名字
//   "id": 25706276,
//   "privilege": {
//     "id": 25706276,
//     "fee": 8,
//     "payed": 0,
//     "st": 0,
//     "pl": 128000,
//     "dl": 0,
//     "sp": 7,
//     "cp": 1,
//     "subp": 1,
//     "cs": false,
//     "maxbr": 999000,
//     "fl": 128000,
//     "toast": false,
//     "flag": 260,
//     "preSell": false,
//     "playMaxbr": 999000,
//     "downloadMaxbr": 999000,
//     "rscl": null,
//     "freeTrialPrivilege": {
//       "resConsumable": false,
//       "userConsumable": false
//     },
//     "chargeInfoList": [
//       {
//         "rate": 128000,
//         "chargeUrl": null,
//         "chargeMessage": null,
//         "chargeType": 0
//       },
//       {
//         "rate": 192000,
//         "chargeUrl": null,
//         "chargeMessage": null,
//         "chargeType": 1
//       },
//       {
//         "rate": 320000,
//         "chargeUrl": null,
//         "chargeMessage": null,
//         "chargeType": 1
//       },
//       {
//         "rate": 999000,
//         "chargeUrl": null,
//         "chargeMessage": null,
//         "chargeType": 1
//       }
//     ]
//   }
// }

/**
 * 获取已收藏专辑列表
 * 说明 : 调用此接口 , 可获得已收藏专辑列表
 * 可选参数 :
 * @param {number} limit: 取出数量 , 默认为 25
 * @param {number} offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*25, 其中 25 为 limit 的值 , 默认 为 0
 * 接口地址 : /album/sublist
 * 调用例子 : /album/sublist ( 周杰伦 )
 */
export function getSubscribeAlbums() {
  return axios({
    method: 'get',
    url: '/album/sublist',
  })
}

/**
 * 收藏/取消收藏专辑
 * 说明 : 调用此接口,可收藏/取消收藏专辑
 * 必选参数 :
 * @param {Number} params.id : 专辑 id
 * @param {Number} params.t : 1 为收藏,其他为取消收藏
 * 接口地址 : /album/sub
 * 调用例子 : /album/sub?t=1 /album/sub?t=0
 */
export function subscribeAlbum(params) {
  return axios({
    method: 'get',
    url: '/album/sub',
    params
  })
}