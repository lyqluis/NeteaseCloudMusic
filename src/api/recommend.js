import axios from 'utils/axios'

// ## podacast
/**
 * 电台 - 推荐
 * 说明 : 登录后调用此接口 , 可获得推荐电台
 * 接口地址 : /dj/recommend
 * 调用例子 : /dj/recommend
 */
export function getRecommendPodcasts() {
  return axios({
    method: 'get',
    url: '/dj/recommend',
  });
}

/**
 * 电台 - 今日优选
 * 说明 : 登录后调用此接口, 可获得电台今日优选
 * 接口地址 : /dj/today/perfered
 * 调用例子 : /dj/today/perfered
 */
export function getTodayPreferedPodcasts() {
  return axios({
    method: 'get',
    url: '/dj/today/perfered',
  });
}

// ## home
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

/**
 * 获取每日推荐歌单
 * 说明 : 调用此接口 , 可获得每日推荐歌单 ( 需要登录 )
 */
export function getDailyRecommendPlaylists() {
  return axios({
    url: '/recommend/resource',
    method: 'get',
  })
}

/**
 * 获取每日推荐歌曲
 * 说明 : 调用此接口 , 可获得每日推荐歌曲 ( 需要登录 )
 * 调用例子 : /recommend/songs
 */
export function getDailyRecommendSongs() {
  return axios({
    url: '/recommend/songs',
    method: 'get',
  })
}

/**
 * 新歌速递
 * 必选参数 :
 * type: 地区类型 id,对应以下:
 * 全部:0
 * 华语:7
 * 欧美:96
 * 日本:8
 * 韩国:16
 * 接口地址 : /top/song
 * 调用例子 : /top/song?type=96
 */
export function getNewSongs(type = 0) {
  return axios({
    method: 'get',
    url: 'top/song',
    params: { type }
  })
}
// todo check the valid of song