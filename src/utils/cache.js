// https://github.com/nbubna/store
import store from 'store2'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 10

export function saveKeyword(keyword) {
  const historykeywords = store.get(SEARCH_KEY, [])
  insert(historykeywords, keyword, val => val === keyword, SEARCH_MAX_LENGTH)
  store.set(SEARCH_KEY, historykeywords)
  return historykeywords
}

function insert(arr, val, compareFn, max) {
  const index = arr.findIndex(compareFn)
  if (!index) return
  index >= 0 && arr.splice(index, 1)
  arr.unshift(val)
  arr.length >= max && arr.pop()
}

export function getHistory() {
  return store.get(SEARCH_KEY, [])
}

export function deleteHistory() {
  store.remove(SEARCH_KEY)
  return []
}


const USER_KEY = '__user__'
/**
 * @param {Object} userInfo.account
 * @param {Object} userInfo.profile
 */
export function saveUserInfo(userInfo) {
  store.set(USER_KEY, userInfo)
  return userInfo
}

export function getUserInfo() {
  return store.get(USER_KEY, {})
}

export function removeUserInfo() {
  const userInfo = {}
  store.set(USER_KEY, userInfo)
  return userInfo
}