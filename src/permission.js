import router from './router'
import pinia from './store/index'
import useUserStore from '@/store/user'
// import { storeToRefs } from 'pinia'

let userStore = useUserStore(pinia)

// 白名单
export const whiteList = ['/login', '/404', '/401']

/**
 * 路由前置守卫
 */
router.beforeEach(async (to, from, next) => {
  // 存在 token ，进入主页
  // if (store.state.user.token) {
  // 快捷访问
  if (userStore.token) {
    // 如果是登录页面，跳转到首页
    if (to.path === '/login') {
      next('/')
    } else {
      // 如果不是登录页面，则向服务器获取用户信息（if语句简写）
      !userStore.hasUserinfo && await userStore.getUserinfo()
      next()
    }
  } else {
    // 没有token的情况下，可以进入白名单
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }

})