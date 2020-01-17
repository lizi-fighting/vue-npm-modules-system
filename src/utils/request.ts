import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
// import { UserModule } from '@/store/modules/user'
import { ResponseError } from '@/utils/ResponseError'
import { getToken, getBaseApi } from '@/utils/cookies'
// import { response } from "express"

const service = axios.create({
  baseURL: getBaseApi() || '', // url = base url + request url
  timeout: 10000
  // withCredentials: true // send cookies when cross-domain requests
})

// Request interceptors
service.interceptors.request.use(
  (config) => {
    // config.headers['Authorization'] = `Basic ${Base64.encode('system:system_secret')}`
    // Add X-Access-Token header to every request, you can add other custom headers here
    let token = getToken()
    // if (token) {
    config.headers['X-Access-Token'] = 'Bearer ' + token
    config.headers['X-Token'] = 'Bearer ' + token
    config.headers['Authorization'] = 'Bearer ' + token
    // }

    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  (response) => {
    // Some example codes here:
    // code == 200:  success

    // You can change this part for your own usage.
    const res = response.data || 200
    if (res !== 200 && !res.access_token && res.code !== 200) {
      // Message({
      //   message: res.msg || 'Error',
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          // ResetToken()
          location.reload() // To prevent bugs from vue-router
        })
      } else if (res.code === 40101 || res.code === 40102 || res.code === 40103) {
        Message({
          message: res.msg,
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return response.data
    }
  },
  (error) => {
    console.log(error)

    let msg = ''
    if (error.code && error.code === 'ECONNABORTED') {
      msg = '系统繁忙， 请稍后重试!'
    } else {
      msg = ResponseError(error.response.status)
    }

    Message({
      message: msg || error.message,
      type: 'error',
      duration: 5 * 1000
    })

    return Promise.reject(error)
  }

)

export default service
