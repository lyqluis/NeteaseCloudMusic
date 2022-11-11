import axios from 'utils/axios'


/**
 * 获取用户详情
 * 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户详情
 * 必选参数: 
 * @param {Number} uid : 用户 id
 * 接口地址 : /user/detail
 * 调用例子 : /user/detail?uid=32953014
 * @return {Object} res
 * @return {Object} res.profile
 * accountStatus: 0
 * allSubscribedCount: 0
 * artistIdentity: Array(0)
 * authStatus: 0
 * authority: 0
 * avatarDetail: null
 * avatarImgId: 109951167830007650
 * avatarImgIdStr: "109951167830007646"
 * avatarImgId_str: "109951167830007646"
 * avatarUrl: "http://p1.music.126.net/kEtEE4PGHtk0WQ6_V2MwsA==/109951167830007646.jpg"
 * backgroundUrl: "..."
 * birthday: 768240000000 // 时间戳
 * blacklist: false
 * cCount: 0
 * city: 350100
 * createTime: 1464788694592  // 时间戳，使用 new Date(value) 可获得完整时间
 * defaultAvatar: false
 * description: ""
 * detailDescription: ""
 * djStatus: 0
 * eventCount: 0
 * expertTags: null
 * experts: Object
 * followMe: false
 * followTime: null
 * followed: false
 * followeds: 1036
 * follows: 119
 * gender: 1  // 性别 1-male, 2-female
 * inBlacklist: false
 * mutual: false
 * newFollows: 119
 * nickname: "他的马子有花臂-"
 * playlistBeSubscribedCount: 41552
 * playlistCount: 3
 * privacyItemUnlimit: Object
 * province: 350000 // 地区
 * remarkName: null
 * sCount: 0
 * sDJPCount: 0
 * signature: ""  // 个人简介
 * userId: 278117278
 * userType: 0
 * vipType: 0
 */
export function getUserDetail(uid) {
  return axios({
    url: '/user/detail',
    method: 'get',
    params: { uid }
  });
}

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

/**
 * 获取用户电台
 * 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户电台
 * 必选参数 : 
 * @param {Object} params.uid 用户 id
 * 接口地址 : /user/dj
 * 调用例子 : /user/dj?uid=32953014
 */
export function getUserPodcasts(uid) {
  return axios({
    url: '/user/dj',
    method: 'get',
    params: { uid }
  });
}

/**
 * 获取用户关注列表
 * 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户关注列表
 * 必选参数 : 
 * @param {Object} params.uid : 用户 id
 * 可选参数 :
 * @param {Object} params.limit : 返回数量 , 默认为 30
 * @param {Object} params.offset : 偏移数量，用于分页 ,如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * 接口地址 : /user/follows
 * 调用例子 : /user/follows?uid=32953014
 */
export function getSubscribedUsers(params) {
  return axios({
    url: '/user/follows',
    method: 'post',
    params
  })
}

/**
 * 关注/取消关注用户
 * 说明 : 登录后调用此接口 , 传入用户 id, 和操作 t,可关注/取消关注用户
 * 必选参数 :
 * @param {Object} params.id 用户 id
 * @param {Object} params.t t=1 关注, 其他为取消关注
 * 接口地址 : /follow
 * 调用例子 : /follow?id=32953014&t=1
 * @return {Obejct}
 * 关注成功:
 * code: 200
 * followContent: "关注能使人吃得好睡得香"
 * followTimeContent: "已关注1天"
 * py: "ygwtb"
 * user: {...}
 * 取消关注:
 * code: 200
 */
export function subscribe(params) {
  return axios({
    url: '/follow',
    method: 'post',
    params
  })
}
