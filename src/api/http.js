import axios from 'axios'
import jwt from '../utils/jwt'

axios.defaults.baseURL = 'http://vadmin.local.dev/api'

// 请求中加入token
axios.interceptors.request.use((config) => {
  if (jwt.checkAuth()) {
    config.headers['Authorization'] = 'Bearer ' + jwt.getToken()
  }
  return config
})

// axios.interceptors.response.use(undefined, err => {
//   if (err.response.status === 401 && store.state.user.token) {
//     return new Promise((resolve, reject) => {
//       axios.post('/auth/renew').then(function (res) {
//         store.commit('logIn', res.data.token)
//         axios({
//           url: err.config.url,
//           method: err.config.method,
//           headers: err.config.headers,
//           data: err.config.data
//         }).then(res => {
//           resolve(res)
//         }, err => {
//           reject(err)
//         })
//       })
//       setTimeout(() => {
//         store.commit('logOut')
//       })
//     })
//   } else {
//     if (err.response.status === 401) store.commit('logOut')
//     if (router.history.current.name !== 'home') router.replace('login')
//     return Promise.reject(err)
//   }
// })

export default axios
