import axios from 'utils/axios'

/**
 * 最近播放-歌曲
 * 说明 : 调用此接口 , 可获得最近播放-歌曲
 * 可选参数
 * @param {number} limit 返回数量 , 默认为 100
 * 接口地址 : /record/recent/song
 * 调用例子 : /record/recent/song?limit=1
 */
export function getRecentSongs(limit = 100) {
  return axios({
    method: 'get',
    url: '/record/recent/song',
    params: { limit },
  });
}

/**
 * 最近播放-歌单
 * 说明 : 调用此接口 , 可获得最近播放-歌单
 * 可选参数 :
 * @param {number} limit 返回数量 , 默认为 100
 * 接口地址 : /record/recent/playlist
 * 调用例子 : /record/recent/playlist?limit=1
 */
export function getRecentPlaylists(limit = 100) {
  return axios({
    method: 'get',
    url: '/record/recent/playlist',
    params: { limit },
  });
}

/**
 * 最近播放-专辑
 * 说明 : 调用此接口 , 可获得最近播放-专辑
 * 可选参数 : 
 * @param {number} limit 返回数量 , 默认为 100
 * 接口地址 : /record/recent/album
 * 调用例子 : /record/recent/album?limit=1
 */
export function getRecentAlbums(limit = 100) {
  return axios({
    method: 'get',
    url: '/record/recent/album',
    params: { limit },
  });
}

/**
 * 最近播放-播客
 * 说明 : 调用此接口 , 可获得最近播放-播客
 * 可选参数 : 
 * @param {number} limit 返回数量 , 默认为 100
 * 接口地址 : /record/recent/dj
 * 调用例子 : /record/recent/dj?limit=1
 */
export function getRecentPodcasts(limit = 100) {
  return axios({
    method: 'get',
    url: '/record/recent/dj',
    params: { limit },
  });
}