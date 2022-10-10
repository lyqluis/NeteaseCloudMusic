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
// export function setCookie(string) {
// }

import { isEmptyObject } from './global'
import { getUserInfo } from './cache'

export function isLoggedIn() {
  const userInfo = getUserInfo()
  return !isEmptyObject(userInfo)
}

// 调用 api@getLoginStatus 来看是否登陆