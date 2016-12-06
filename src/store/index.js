import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import auth from './modules/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
  actions,
  modules: {
    auth
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
