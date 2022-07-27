import axios from 'axios'

const axiosInstance = axios.create({
  baseURL:import.meta.env.VITE_URL,

})
console.log(import.meta.env.VITE_URL);
// request拦截器 获取用户数据的时候，要告诉服务器现在是已经的登录的状态，在header附带token值，验证当前用户
axiosInstance.interceptors.request.use(
  (requestInfo) => {
    if (requestInfo.headers) {
      requestInfo.headers['token'] = localStorage.getItem('token') || '0'
      requestInfo.headers['Content-Type'] = 'application/json;charset=UTF-8'
      return requestInfo
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)
// response 拦截器
axiosInstance.interceptors.response.use(response=>{
  // debugger
  const res = response.data
  if(res.code === 200){
    return res
  }else if(res.code === 10001){
    alert('未登录或者登录已过期')
  }else if(res.code === 10002){
    alert('权限不足')
  }else {
    alert(res.message)
  }
})
export default axiosInstance