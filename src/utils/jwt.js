import storage from './storage'

const JWT_TOKEN_KEY = 'token'

export default {
  setToken (token) {
    storage.write(JWT_TOKEN_KEY, token)
  },
  getToken () {
    return storage.read(JWT_TOKEN_KEY)
  },
  removeToken () {
    storage.delete(JWT_TOKEN_KEY)
  },
  checkAuth () {
    return storage.check(JWT_TOKEN_KEY)
  }
}
