import axios from 'axios'
import qs from 'qs'
import NoDataTip from '../components/NoDataTip'
import { BASE_URL } from '../config'

const http = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// 请求拦截器
http.interceptors.request.use(
  config => {
    config.data = qs.stringify(config.data) // 转为formdata数据格式
    return config
  },
  error => Promise.error(error)
)

http.interceptors.response.use(response => {
  return response.data
}, error => {
  // 断网时
  if (!window.navigator.onLine) {
    document.body.innerHTML = NoDataTip.tpl('icon-duanwang', '您的网络似乎好像出了问题')
    document.addEventListener('click', function () {
      location.reload()
    })
  }
  return Promise.reject(error)
})

export default http
