import axios from 'utils/axios.js'

// 首页发现全部内容
export function getFind() {
  return axios({
    url: '/homepage/block/page',
    method: 'get',
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



