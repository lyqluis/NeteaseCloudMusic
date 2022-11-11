import axios from 'utils/axios.js'

/**
 * 首页-发现
 * 说明 : 调用此接口 , 可获取 APP 首页信息
 * 接口地址 : /homepage/block/page
 * 可选参数 : 
 * @param {Boolean} params.refresh: 是否刷新数据,默认为 false
 * @param {String} params.cursor: 上一条数据返回的 cursor
 */
export function getFind(params) {
  return axios({
    url: '/homepage/block/page',
    method: 'get',
    params,
  })
}


// 轮播图
export function getBanner() {
  return axios({
    url: '/banner',
    method: 'get',
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



