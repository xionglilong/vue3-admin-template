import axios from 'axios'
// import qs from 'qs'
import { ElMessage } from 'element-plus'
import router from '../router/index'
import useUserStore from '../store/user.js'


// -------------------------------axios全局配置--------------------------------

// 设置接口超时时间
axios.defaults.timeout = 60000

// 请求地址，这里是动态赋值的的环境变量，下一篇会细讲，这里跳过
// @ts-ignore
axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL

// 跨域请求要求携带cookie
// axios.defaults.withCredentials = true


const toLogin = () => {
  // useUserStore().logout()
  router.push({
    path: '/login',
    query: {
      redirect: router.currentRoute.value.path !== '/login' ? router.currentRoute.value.fullPath : undefined,
    },
  })
}


// --------------------------------- 创建一个request实例 -----------------------------------
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,  // 使用环境变量指定
  // baseURL: import.meta.env.DEV && import.meta.env.VITE_OPEN_PROXY === 'true' ? '/proxy/' : import.meta.env.VITE_APP_BASE_URL,
  withCredentials: true,  // 跨域请求是要不要携带cookie
  timeout: 6000,  // 超时时间
  responseType: 'json',
})


// http request 全局请求拦截器
request.interceptors.request.use(  // 方式二，这里注销掉
// axios.interceptors.request.use(
    config => {
      const userStore = useUserStore()

      // api服务器验证
      config.headers.icode = '9D23F3D57AE2FA3A'

      // 如果登录，则传递token
      if (userStore.hasLogin && config.headers) {
        // config.headers.Token = userStore.token
        config.headers.Authorization = `Bearer ${userStore.token}`
      }

      // 当然也可以直接配置请求头header，这里我们注释掉代码
      // config.headers = {
      //'Content-Type':'application/x-www-form-urlencoded',   // 传参方式表单
      // 'Content-Type':'application/json;charset=UTF-8',        // 传参方式json
      // 'token':'80c483d59ca86ad0393cf8a98416e2a1'              // 这里自定义配置，这里传的是token
      // };

      // 是否将 POST 请求参数进行字符串化处理
      if (config.method === 'post') {
        // request.data = qs.stringify(request.data, {
        //   arrayFormat: 'brackets',
        // })
      }
      return config
    },
    // 这句话可不要
    error => {
      return Promise.reject(error)
    }
)

// http response 全局响应拦截器
request.interceptors.response.use(  // 方式二，这里注销掉
// axios.interceptors.response.use(
    (response) => {
      /**
       * 全局拦截请求发送后返回的200范围的数据，如果数据有报错则在这做全局的错误提示
       * 假设返回数据格式为：{ status: 1, error: '', data: '' }
       * 规则是当 status 为 1 时表示请求成功，为 0 时表示接口需要登录或者登录状态失效，需要重新登录
       */
      if (response.data.status === 1) {
        if (response.data.error !== '') {
          // 这里做错误提示，如果使用了 element plus 则可以使用 Message 进行提示
          ElMessage.error(response.data.error)
          return Promise.reject(response.data)
        }
      } 
      else {
        // toLogin()
      }
      return Promise.resolve(response.data.data)  // 第一个data是响应包的数据，第二个data是数据中的键
    },
    (error) => {
      // 响应码不是200范围的包

      // // 返回401认证失败，可能是token过期，也可能是没有登录
      if (error.response && error.response.data && error.response.data.code === 401) {
        // ElMessage.error(error.message)
        const userStore = useUserStore()
        userStore.logout()  // 退出登录
      }


      let message = error.message
      if (message === 'Network Error') {
        message = '后端网络故障'
      }
      else if (message.includes('timeout')) {
        message = '接口请求超时'
      }
      else if (message.includes('Request failed with status code')) {
        message = `接口${message.substr(message.length - 3)}异常`
      }
      ElMessage({ message, type: 'error', })
      return Promise.reject(error)
    },
)

// 导出request实例
export default request