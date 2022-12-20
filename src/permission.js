import router from './router'
import pinia from './store/index'
import useUserStore from '@/store/user'
// import { storeToRefs } from 'pinia'

let UserStore = useUserStore(pinia)

// 白名单
const whiteList = ['/login', '/']
/**
 * 路由前置守卫
 */
router.beforeEach(async (to, from, next) => {
  // 存在 token ，进入主页
  // if (store.state.user.token) {
  // 快捷访问
  if (UserStore.token) {
    if (to.path === '/login') {
      next('/')
    } else {
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