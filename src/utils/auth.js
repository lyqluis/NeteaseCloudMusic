// MDN: https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies
// JavaScript Document.cookie API 无法访问带有 HttpOnly 属性的 cookie；
// 此类 Cookie 仅作用于服务器。
// 例如，持久化服务器端会话的 Cookie 不需要对 JavaScript 可用，而应具有 HttpOnly 属性。
// 此预防措施有助于缓解跨站点脚本（XSS） (en-US)攻击。


// no need to handle cookie, 
// because cookie sent from server is with 'httponly'
// so it cant be read / written by web api 'document.cookie'
// https://github.com/js-cookie/js-cookie
// import Cookies from 'js-cookie'

// __csrf ?
// MUSIC_U 只有在账户登录的情况下才有

import { isEmptyObject } from './global'
import { getUserInfo, removeUserInfo } from './cache'
import { getLoginStatus } from 'api/auth'
import store from 'store/index'

// check local login status
export function isLoggedIn() {
  const userInfo = getUserInfo()
  return !isEmptyObject(userInfo)
}

export function checkLocalLoginStatus() {
  if (isLoggedIn()) return
  checkServerLoginStatus()
}

export async function checkServerLoginStatus() {
  const { data } = await getLoginStatus()

  // exclude one wired & unvalidate accoount
  if (data.account?.id == 8023474819) {
    // just directly delete account in the local storage
    return await removeUserInfo()
  }

  // if logged in, data.account is not null
  return data
}

/**
 * use as vue router global guard
 */
export async function globalCheck(to, from, next) {
  console.log('global 🧭')
  const isLoggedIn = await store.dispatch('user/checkLoginStatus')
  console.log('global 🧭 ends', isLoggedIn, to)

  if (to.meta.requiresAuth) {
    if (isLoggedIn) {
      next()
    } else {
      next('/login')
    }
  } else {
    if (to.name === 'Login') {
      if (isLoggedIn) {
        next('/now')
      } else next()
    } else {
      next()
    }
  }
}
