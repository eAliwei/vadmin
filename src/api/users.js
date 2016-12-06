import http from './http'

export default {
  // 登录
  list () {
    return http.get('/users')
  }
}
