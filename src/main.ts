// 该文件会被父目录的index.html页面调用起来
import { createApp } from 'vue'
import App from './App.vue'
import pinia from './store/index.js'
import router from './router'
import './style.css'
import './permission.js'

// 使用App.vue组件创建一个应用
const app = createApp(App)
 // 在vue app中安装路由插件
app.use(router) 
// 在vue app中全局注册状态管理插件
app.use(pinia)  
// 将应用挂载到index.html的id为app的标签上
app.mount('#app')