// import axios from 'axios'

const baseURL = process.env.VUE_APP_BASE_API;

const service = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 15000,
  // `validateStatus` defines whether to resolve or reject the promise for a given
  // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
  // or `undefined`), the promise will be resolved; otherwise, the promise will be
  // rejected.
  validateStatus: function (status) {
    return status >= 200 && status < 300 || status == 400; // default
  },
});

// 请求拦截器
service.interceptors.request.use(
  // todo auth cookies
  config => {
    console.log(config)
    // config.params.realIP = '116.25.146.177'
    // config.params.proxy = 'http://127.0.0.1:1089'
    return config
  }
)

// 回应拦截器
service.interceptors.response.use(
  res => {
    // console.log('axios res interceptor:', res)
    if (res.status >= 200 && res.status < 300) {
      return res.data
    } else {
      return Promise.reject(res.data)
    }
  },
  err => {
    console.log(err)
    console.log('axios res interceptor err:', err.toJSON())
    return Promise.reject(err)
  }
);

export default service