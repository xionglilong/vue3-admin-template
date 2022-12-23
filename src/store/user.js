import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import md5 from 'js-md5'  // npm install js-md5
import request from "@/api/index.ts"

const useUserStore = defineStore('user', () => {
      // ref 代替 state属性
      const username = ref(localStorage.username) || ref('') // 用户名
      const userinfo = ref({})
      const name = ref('张三')  // 昵称
      const age = ref(localStorage.age) || ref(0)  // 年龄
      const token = ref(localStorage.token) || ref('')
      const refresh = ref(localStorage.refresh) || ref('')
      // const failure_time = ref(localStorage.failure_time) || ref('2022-01-01')  // token过期时间
      // const permissions = ref(localStorage.permissions) || ref(['', '', ''])  // 权限

      // computed 代替 getters属性，用来封装计算属性
      const isLogin = computed(() => {
        return !!token.value
      })

      const isUserinfo = computed(() => {
        return JSON.stringify(userinfo.value) !== '{}'
      })

      // function 代替 actions属性，编辑业务逻辑
      function login(data) {
        const { username, password } = data
        const password_md5 = md5(password)
        return new Promise((resolve, reject) => {
          // 通过 mock 进行登录
          // request.post('/login', data, { baseURL: '/' })
          request.post('/sys/login', {username: username, password: password_md5})
              .then(res => {
                console.log(res.access)
                console.log(res.refresh)
                localStorage.setItem('token', res.data.token)
                // localStorage.setItem('refresh', res.refresh)  // 刷新码
                this.token = res.data.token
                // this.refresh = res.refresh
                
                // token.value = res.access
                // refresh.value = res.refresh

                resolve()
              })
              .catch(error => {
                reject(error)
              })
        })
      }

      async function getUserinfo(context) {
        const res = await request.get('/sys/profile')
        this.userinfo = res
        console.log(res)
        return res
      }

      function setAge(data) {
        console.log(data)
        age.value = data
      }

      return { username, name, age, token, isLogin, login, getUserinfo, setAge, refresh, userinfo, isUserinfo }
    },
    {  // 第三个参数作为其他插件配置
      persist: {
        enabled: true, // 开启缓存，默认会存储在本地localstorage，且是整个store都存储
        // storage: sessionStorage, // 缓存使用方式
        // paths:[], // 需要缓存键

        // strategies: [
        //   { storage: sessionStorage, paths: ['firstName', 'lastName'] }, // firstName 和 lastName字段用sessionStorage存储
        //   { storage: localStorage, paths: ['accessToken'] }, // accessToken字段用 localstorage存储
        // ],

      }
    })

export default useUserStore