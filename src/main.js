import Vue from 'vue'
import App from './App'
import { sync } from 'vuex-router-sync'
import store from './store'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import jwt from './utils/jwt'

sync(store, router)

// axios配置
axios.defaults.baseURL = 'http://vadmin.local.dev/api'

// 请求hook
axios.interceptors.request.use((config) => {
  // 请求headers中加入token
  if (jwt.checkAuth()) {
    config.headers['Authorization'] = 'Bearer ' + jwt.getToken()
  }
  return config
})

// 返回结果filter
axios.interceptors.response.use((response) => {
  return response
}, (error) => {
  // token过期
  if (error.response.status === 401 && jwt.checkAuth() && !store.state.auth.refreshToken) {
    // 获取新的token
    store.dispatch('refreshToken').then(() => {
      // 成功后刷新页面
      // window.location.reload()
    }, () => {
      // 刷新失败退出登录
      store.dispatch('logout').then(() => {
        router.replace({ name: 'home' })
      })
    })
  }
  return Promise.reject(error)
})

Vue.use(VueAxios, axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router: router,
  store: store
})
