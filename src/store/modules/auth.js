import * as types from '../mutation-types'
import jwt from '../../utils/jwt'
import { auth as authApi } from '../../api'

const state = {
  // 刷新token请求
  refreshToken: false,
  // 当前登录信息
  currentUser: {}
}

const getters = {
  currentUser: state => state.currentUser
}

const actions = {
  // 登录
  login ({ commit }, auth) {
    return new Promise((resolve, reject) => {
      authApi.login(auth).then((response) => {
        // 登录成功后存储token
        jwt.setToken(response.data.token)
        resolve()
      })
      .catch((error) => {
        reject(error)
      })
    })
  },
  // 退出
  logout ({ commit }) {
    return new Promise((resolve) => {
      jwt.removeToken()
      commit(types.AUTH_LOGOUT)
      resolve()
    })
  },
  // 刷新token
  refreshToken ({ commit, state }) {
    if (!state.refreshToken) {
      commit(types.AUTH_REFRESH_TOKEN, true)
      return new Promise((resolve, reject) => {
        authApi.refreshToken().then((response) => {
          jwt.setToken(response.data.token)
          commit(types.AUTH_REFRESH_TOKEN, false)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
      })
    }
    return Promise.resolve()
  },
  // 当前登录信息
  fetchCurrentUser ({ commit, state }) {
    if (Object.keys(state.currentUser).length > 0) {
      return Promise.resolve(state.currentUser)
    } else {
      return new Promise((resolve, reject) => {
        authApi.me().then((response) => {
          resolve(response.data)
          commit(types.AUTH_CURRENT_USER, response.data)
        })
        .catch((error) => {
          reject(error)
        })
      })
    }
  }
}

const mutations = {
  [types.AUTH_LOGOUT] (state) {
    state.currentUser = {}
  },
  [types.AUTH_CURRENT_USER] (state, currentUser) {
    state.currentUser = currentUser
  },
  [types.AUTH_REFRESH_TOKEN] (state, flag) {
    state.refreshToken = flag
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
