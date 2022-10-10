import axios from 'utils/axios'

/**
 * 推荐节目
 * 说明 : 调用此接口, 可获取推荐电台
 * 接口地址 : /personalized/djprogram
 * 调用例子 : /personalized/djprogram
 */
export function getRecommendPrograms() {
  return axios({
    method: 'get',
    url: '/personalized/djprogram',
  });
}
/**
 * 推荐节目
 * 说明 : 调用此接口 , 可获取推荐电台
 * 接口地址 : /program/recommend
 * 调用例子 : /program/recommend
 */
export function getRecommendPrograms2() {
  return axios({
    method: 'get',
    url: '/program/recommend',
  });
}

/**
 * 热门电台
 * 说明 : 调用此接口,可获取热门电台
 * 可选参数 :
 * limit : 返回数量 , 默认为 30
 * offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0 接口地址 : /dj/hot
 * 调用例子 : /dj/hot
 * @param {Number} params.limit
 * @param {Number} params.offset = page * limit
 */
export function getHotPodcasts(params) {
  return axios({
    method: 'get',
    url: '/dj/hot',
    params,
  });
}

/**
 * 电台 - 详情
 * 说明 : 登录后调用此接口, 传入rid, 可获得对应电台的详情介绍
 * 必选参数 : rid: 电台的 id
 * 接口地址 : /dj/detail
 * 调用例子 : /dj/detail?rid=336355127 (对应'代码时间'的详情介绍)
 * @param {String, Number} params.id
 */
export function getPodcastDetail(rid) {
  return axios({
    method: 'get',
    url: '/dj/detail',
    params: { rid },
  });
}

/**
 * 电台 - 节目
 * 说明: 登录后调用此接口, 传入rid, 可查看对应电台的电台节目以及对应的 id, 
 * 需要注意的是这个接口返回的 mp3Url 已经无效, 都为 null, 
 * !! 通过调用 /song/url 这个接口, 传入节目 mainTrackId 仍然能获取到节目音频, 
 * 如 /song/url?id=478446370 获取代码时间的一个节目的音频
 * 接口地址: /dj/program
 * 调用例子: /dj/program?rid=336355127&limit=40(对应'代码时间'的节目列表)
 * 必选参数
 * @param {Number} params.rid 电台的 id
 * 可选参数
 * @param {Number} params.limit 返回数量, 默认为 30
 * @param {Number} params.offset 偏移数量，用于分页, 如 : (页数 - 1) * 30, 其中 30 为 limit 的值, 默认为 0
 * @param {Number} params.asc 排序方式, 默认为 false(新 => 老) 设置 true 可改为 老 => 新
 */
export function getPodcastPrograms(params) {
  return axios({
    method: 'get',
    url: '/dj/program',
    params,
  });
}

// ?? 不需要
/**
 * 电台 - 节目详情
 * 说明: 调用此接口传入电台节目 id, 可获得电台节目详情
 * 必选参数: id: 电台节目 的 id
 * 接口地址: /dj/program/detail
 * 调用例子: /dj/program/detail?id=1367665101
 * @param {String, Number} params.id
 * @return {*}
 */
export function getProgramDetail(id) {
  return axios({
    method: 'get',
    url: '/dj/program/detail',
    params: { id },
  });
}
