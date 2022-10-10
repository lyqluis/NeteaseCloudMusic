import axios from 'utils/axios'

/**
 * ## login with phone
 */

/**
 * 手机登录
 * - phone: 手机号码
 * - password: 密码
 * - countrycode: 国家码，用于国外手机号登录，例如美国传入：1
 * - md5_password: md5加密后的密码,传入后 password 将失效
 * @param {Object} params
 * @param {string} params.phone
 * @param {string} params.password
 * @param {string=} params.countrycode
 * @param {string=} params.md5_password
 */
export function loginWithPhone(params) {
  return axios({
    url: '/login/cellphone',
    method: 'post',
    params,
  });
}

/**
 * ## login with email
 */

/**
 * 邮箱登录
 * - email: 163 网易邮箱
 * - password: 密码
 * - md5_password: md5加密后的密码,传入后 password 将失效
 * @param {Object} params
 * @param {string} params.email
 * @param {string} params.password
 * @param {string=} params.md5_password
 */
export function loginWithEmail(params) {
  return axios({
    url: '/login',
    method: 'post',
    params,
  });
}

/**
 * ## login with qr code
 * 参考：https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=_3-%e4%ba%8c%e7%bb%b4%e7%a0%81%e6%a3%80%e6%b5%8b%e6%89%ab%e7%a0%81%e7%8a%b6%e6%80%81%e6%8e%a5%e5%8f%a3
 */

/**
 * 二维码key生成接口
 * 说明: 调用此接口可生成一个 key
 */
export function createLoginQrCodeKey() {
  return axios({
    url: '/login/qr/key',
    method: 'get',
    params: {
      timestamp: Date.now(),
    },
  });
}

/**
 * 二维码生成接口
 * 说明: 调用此接口传入上一个接口生成的key可生成二维码图片的base64和二维码信息,
 * 可使用base64展示图片,或者使用二维码信息内容自行使用第三方二维码生产库渲染二维码
 * @param {Object} params
 * @param {String} params.key
 * @param {Boolean} params.qrimg 传入后会额外返回二维码图片base64编码
 */
export function createLoginQrCode(params) {
  return axios({
    url: '/login/qr/create',
    method: 'get',
    params: {
      ...params,
      timestamp: Date.now(),
    },
  });
}

/**
 * 二维码检测扫码状态接口
 * 说明: 轮询此接口可获取二维码扫码状态
 * 800为二维码过期,801为等待扫码,802为待确认,803为授权登录成功(803状态码下会返回cookies)
 * @param {string} key
 */
export function checkLoginQrCode(key) {
  return axios({
    url: '/login/qr/check',
    method: 'post',
    params: {
      key,
      timestamp: Date.now(),
    },
  });
}

export const qrCodeStatusMsg = {
  800: '二维码已过期，请刷新二维码',
  801: '等待扫码，请打开网易云 app 扫码',
  802: '等待确认，请在手机上确认',
  803: '授权登录成功，请稍等' // (803状态码下会返回cookies)
}

/**
 * ## login with vistor
 * doesn't work
 */

/**
 * 游客登录
 * 说明: 直接调用此接口, 可获取游客cookie,
 * 如果遇到其他接口未登录状态报 400 状态码需要验证的错误, 
 * 可使用此接口获取游客cookie避免报错
 */
export function loginWithVisitor() {
  return axios({
    method: 'post',
    url: '/register/anonimous',
  })
}

/**
 * 刷新登录
 * 说明 : 调用此接口 , 可刷新登录状态
 * (不支持刷新二维码登录的cookie)
 * - 调用例子 : /login/refresh
 */
export function refreshCookie() {
  return axios({
    method: 'post',
    url: '/login/refresh',
  });
}

/**
 * 登录状态
 * 说明: 调用此接口, 可获取登录状态
 * @return {Number} res.data.code (200)
 * @return {Object} res.data.account
 * @return {Object} res.data.profile
 */
export function getLoginStatus() {
  return axios({
    method: 'post',
    url: '/login/status',
    params: { 
      timestamp: Date.now() // non essential
    }
  });
}

/**
 * 退出登录
 * 说明 : 调用此接口 , 可退出登录
 */
export function logout() {
  return axios({
    url: '/logout',
    method: 'post',
  });
}