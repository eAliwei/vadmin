import http from './http'

export default {
  // 登录
  login (auth) {
    return http.post('/authorization', auth)
  },
  // 当前登录信息
  me () {
    return http.get('/me')
  },
  // 刷新token
  refresh () {
    return http.post('/refresh')
  }
}
