import axios from 'axios'

const baseURL = process.env.VUE_APP_BASE_API;

const service = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 15000,
});

// 请求拦截器
service.interceptors.request.use(
  // todo auth cookies
  // config => {
  // }
)

// 回应拦截器
service.interceptors.response.use(
  res => {
    return res.data
  },
  err => {
    return Promise.reject(err)
  }
);

export default service