import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import {store} from '@/store'
import { loginByToken } from '@/api/Auth'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
  },
  {
    path: '/',
    redirect: '/index',
    name: 'Index',
    component: Layout,
    meta: {
      title: '首页',
      icon: 'house',
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index/Index.vue'),
        meta: {
          title: '首页',
          icon: 'house',
        },
      },
    ],
  },
  {
    path: '/user',
    redirect: '/user/manger',
    name: 'User',
    component: Layout,
    meta: {
      title: '用户管理',
      affix: true,
      icon: 'UserFilled',
    },
    children: [
      {
        path: 'manger',
        name: 'UserManger',
        component: () => import('@/views/user/User.vue'),
        meta: {
          title: '用户管理',
          icon: 'UserFilled',
        },
      },
    ],
  },
  {
    path: '/stores',
    redirect: '/stores/Location',
    name: 'storesLocation',
    component: Layout,
    meta: {
      title: '门店管理',
      icon: 'LocationInformation',
    },
    children: [
      {
        path: 'Location',
        name: 'storesLocation',
        component: () => import('@/views/storesLocation/StoresLocation.vue'),
        meta: {
          title: '门店管理',
          icon: 'LocationInformation',
        },
      },
    ],
  },
  {
    path: '/order',
    name: 'Order',
    component: Layout,
    meta: {
      title: '订单管理',
      icon: 'Notebook',
      roles: ['admin', 'editor'],
    },
    children: [
      {
        path: 'orderQuery',
        name: 'orderQuery',
        component: () => import('@/views/orders/OrderQuery.vue'),
        meta: {
          title: '订单查询',
          icon: 'Notification',
        },
      },
      {
        path: 'orderAction',
        name: 'orderAction',
        component: () => import('@/views/orders/OrderAction.vue'),
        meta: {
          title: '订单处理',
          icon: 'Money',
        },
      },
    ],
  },
  {
    path: '/good',
    name: 'good',
    component: Layout,
    meta: {
      title: '商品管理',
      icon: 'TakeawayBox',
    },
    children: [
      {
        path: 'category',
        name: 'category',
        component: () => import('@/views/goods/Goods.vue'),
        meta: {
          title: '商品种类',
          icon: 'ShoppingBag',
        },
      },
      {
        path: 'goodQuery',
        name: 'goodQuery',
        component: () => import('@/views/goods/Category.vue'),
        meta: {
          title: '商品查询',
          icon: 'SoldOut',
        },
      },
    ],
  },
  {
    path: '/system',
    name: 'system',
    component: Layout,
    meta: {
      title: 'system',
      icon: 'Wallet',
      roles: ['admin', 'editor'],
    },
    children: [
      {
        path: 'account',
        name: 'account',
        component: () => import('@/views/system/Account.vue'),
        meta: {
          title: 'account',
          icon: 'User',
          roles: ['editor'],
        },
      },
      {
        path: 'group',
        name: 'group',
        component: () => import('@/views/system/Group.vue'),
        meta: {
          title: 'group',
          icon: 'Refrigerator',
          roles: ['admin'],
        },
      },
      {
        path: 'task',
        name: 'task',
        component: () => import('@/views/system/Task.vue'),
        meta: {
          title: 'task',
          icon: 'Clock',
          roles: ['editor'],
        },
      },
      {
        path: 'Setting',
        name: 'Setting',
        component: () => import('@/views/system/Setting.vue'),
        meta: {
          title: '系统设置',
          icon: 'Setting',
          roles: ['admin'],
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})

router.beforeEach((to,from,next)=>{
  const token = localStorage.getItem('token')
  if(!store.state.authStore.token && !token){ //如果内存没有token值并且本地没有token跳转去登录页面
    if(to.path.startsWith('/login')) // 如果要去的路径是login页面保持不变
    next()
    else{
      // console.log('还没有登录');
      next('/login') //如果没有要去登录页面，跳去登录页面
    }
  }else if(!store.state.authStore.token && token){ //如果内存当中没有token本地有token，发起token登录请求
    loginByToken(token).then(res=>{
      if(res.data.status){ //状态200进入
        store.commit('authStore/addUserInfo',res.data)
        next()
      }else{
        next('/login')
      }
      
    }) 
  }
  else{
    next() // 有token值直接跳转
  }
})

export default router
