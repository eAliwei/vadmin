import Vue from 'vue'
import VueRouter from 'vue-router'
import jwt from '../utils/jwt'
import AppMain from '../components/AppMain'
import NotFound from '../views/share/NotFound'
import Login from '../views/Login'
import Dashboard from '../views/Dashboard'
import UserList from '../views/users/List'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  linkActiveClass: 'active',
  routes: [
    { name: 'home', path: '/', component: Login, meta: { title: '用户登录' } },
    {
      name: 'admin',
      path: '/admin',
      component: AppMain,
      redirect: { name: 'admin.dashboard' },
      meta: { title: 'vadmin' },
      children: [
        { name: 'admin.dashboard', path: 'dashboard', component: Dashboard, meta: { title: '管理面板' } },
        { name: 'admin.users', path: 'users', component: UserList, meta: { title: '用户管理' } }
      ]
    },
    { name: '404', path: '*', component: NotFound, meta: { title: 'NotFound' } }
  ]
})

router.beforeEach((to, from, next) => {
  // 已经登录的状态
  if (jwt.checkAuth()) {
    if (to.name === 'home') {
      next({ name: 'admin.dashboard' })
    } else {
      next()
    }
  } else if (to.name !== 'home') {
    next({ name: 'home' })
  } else {
    next()
  }
})

router.afterEach((route) => {
  let title = ''
  route.matched.forEach((item) => {
    if (item.meta.title) {
      title += title === '' ? item.meta.title : ' | ' + item.meta.title
    }
  })
  document.title = title
})

export default router
