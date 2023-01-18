import { defineStore } from 'pinia'
import { ref, computed, reactive, toRefs, shallowRef } from 'vue'
import router from '../router'
import md5 from 'js-md5' // npm install js-md5
import request from '@/api/index.ts'

const useUserStore = defineStore(
  'user',
  () => {
    // ref 代替 state属性
    const username = ref(localStorage.username) || ref('') // 用户名
    const userinfo_init = { avatar: '', permission: {}, role: {}, title: '', username: '' }
    const userinfo = shallowRef({})
    const name = ref('张三') // 昵称
    const age = ref(localStorage.age) || ref(0) // 年龄
    const token = ref(localStorage.token) || ref('')
    const refresh = ref(localStorage.refresh) || ref('')
    // const failure_time = ref(localStorage.failure_time) || ref('2022-01-01')  // token过期时间
    // const permissions = ref(localStorage.permissions) || ref(['', '', ''])  // 权限

    // computed 代替 getters属性，用来封装计算属性

    // 判断是否登录
    const hasLogin = computed(() => {
      return !!token.value
    })

    //  判断是否存在用户信息
    const hasUserinfo = computed(() => {
      // return JSON.stringify(userinfo.value) !== '{}'
      // return JSON.stringify(userinfo) !== JSON.stringify(userinfo_init)
      return false
    })

    // function 代替 actions属性，编辑业务逻辑
    function login(data) {
      const { username, password } = data
      const password_md5 = md5(password)
      return new Promise((resolve, reject) => {
        // 通过 mock 进行登录
        // request.post('/login', data, { baseURL: '/' })
        request
          .post('/sys/login', { username: username, password: password_md5 })
          .then(res => {
            console.log(res.access)
            console.log(res.refresh)
            localStorage.setItem('token', res.token)
            // localStorage.setItem('refresh', res.refresh)  // 刷新码
            this.token = res.token
            // this.refresh = res.refresh

            // token.value = res.access
            // refresh.value = res.refresh

            router.push('/')

            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    }

    function logout() {
      // pinia中使用setup风格定义的store不能使用$reset()方法
      token.value = ''
      localStorage.clear()
      // 清空session
      sessionStorage.clear()
      router.push('/login')
      console.log('退出登录完成。')
    }

    async function getUserinfo(context) {
      const res = await request.get('/sys/profile')
      console.log('已获取用户信息')
      this.userinfo = res
      return res
    }

    function setAge(data) {
      age.value = data
    }

    return { username, name, age, token, hasLogin, login, logout, getUserinfo, setAge, refresh, userinfo, hasUserinfo }
  },
  {
    // 第三个参数作为其他插件配置
    persist: {
      enabled: true // 开启缓存，默认会存储在本地localstorage，且是整个store都存储
      // storage: sessionStorage, // 缓存使用方式
      // paths:[], // 需要缓存键

      // strategies: [
      //   { storage: sessionStorage, paths: ['firstName', 'lastName'] }, // firstName 和 lastName字段用sessionStorage存储
      //   { storage: localStorage, paths: ['accessToken'] }, // accessToken字段用 localstorage存储
      // ],
    }
  }
)

export default useUserStore