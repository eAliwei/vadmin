import Vue from 'vue'

// Auth
const auth = {
  // 登录
  login (auth) {
    return Vue.axios.post('/authorization', auth)
  },
  // 当前登录信息
  me () {
    return Vue.axios.get('/me')
  },
  // 刷新token
  refreshToken () {
    return Vue.axios.post('/refresh_token')
  }
}

// 用户
const users = {
  // 登录
  list () {
    return Vue.axios.get('/users')
  }
}

export {
  auth,
  users
}
