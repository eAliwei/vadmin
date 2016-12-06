import * as types from '../mutation-types'
import jwt from '../../utils/jwt'
import authApi from '../../api/auth'

const state = {
  currentUser: {}
}

const getters = {
  currentUser: state => state.currentUser
}

const actions = {
  login ({ commit }, auth) {
    return new Promise((resolve, reject) => {
      authApi.login(auth).then((response) => {
        jwt.setToken(response.data.token)
        resolve()
      })
      .catch((error) => {
        reject(error)
      })
    })
  },
  logout ({ commit }) {
    return new Promise((resolve) => {
      jwt.removeToken()
      commit(types.AUTH_LOGOUT)
      resolve()
    })
  },
  fetchCurrentUser ({ commit }) {
    authApi.me().then((response) => {
      commit(types.AUTH_CURRENT_USER, response.data)
    })
  }
}

const mutations = {
  [types.AUTH_LOGOUT] (state) {
    state.logged = false
    state.currentUser = {}
  },
  [types.AUTH_CURRENT_USER] (state, currentUser) {
    state.currentUser = currentUser
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
