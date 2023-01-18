import { createRouter, createWebHashHistory } from 'vue-router'

const publicRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/user/login.vue'),
  },
  {
    path: '/',
    // 注意：带有路径“/”的记录中的组件“默认”是一个不返回 Promise 的函数
    component: () => import('@/layout/index.vue'),
    redirect: '/profile',
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/user/profile.vue'),
        meta: {
          title: '个人中心',
          icon: 'User'
        }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/system/404.vue'),
      },
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/system/401.vue'),
      }
    ]
  }
]

const privateRoutes = [
  {
    path: '/user',
    component: () => import('@/layout/index.vue'),
    redirect: '/user/manage',
    meta: {
      title: '用户',
      icon: 'User'
    },
    children: [
      {
        path: '/user/manage',
        component: () => import('@/views/user/userManage.vue'),
        meta: {
          title: '用户管理',
          icon: 'Bicycle'
        }
      },
      {
        path: '/user/role',
        component: () => import('@/views/user/roleManage.vue'),
        meta: {
          title: '角色管理',
          icon: 'Coin'
        }
      },
      {
        path: '/user/permission',
        component: () => import('@/views/user/permissionManage.vue'),
        meta: {
          title: '权限管理',
          icon: 'Key'
        }
      },
      {
        path: '/user/info/:id',
        name: 'userInfo',
        component: () => import('@/views/user/userInfo.vue'),
        meta: {
          title: '用户信息'
        }
      },
      {
        path: '/user/import',
        name: 'userImport',
        component: () => import('@/views/user/userImport.vue'),
        meta: {
          title: '导入用户'
        }
      }
    ]
  },

  {
    path: '/article',
    component: () => import('@/layout/index.vue'),
    redirect: '/article/ranking',
    meta: {
      title: '文章',
      icon: 'Document'
    },
    children: [
      {
        path: '/article/ranking',
        component: () => import('@/views/article/articleRanking.vue'),
        meta: {
          title: '文章排名',
          icon: 'Memo'
        }
      },
      {
        path: '/article/:id',
        component: () => import('@/views/article/articleDetail.vue'),
        meta: {
          title: '文章详情'
        }
      },
      {
        path: '/article/create',
        component: () => import('@/views/article/articleCreate.vue'),
        meta: {
          title: '文章创建',
          icon: 'DocumentAdd'
        }
      },
      {
        path: '/article/editor/:id',
        component: () => import('@/views/article/articleEdit.vue'),
        meta: {
          title: '文章编辑'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  // routes: publicRoutes
  routes: [...publicRoutes, ...privateRoutes]
})

export default router