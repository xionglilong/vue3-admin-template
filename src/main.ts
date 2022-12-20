import { createApp } from 'vue'
import App from './App.vue'
import pinia from './store/index.js'
import router from './router'
import './style.css'
import './permission.js'

const app = createApp(App)
app.use(router)  // 在vue app中安装路由插件
app.use(pinia)  // 在vue app中全局注册状态管理插件
app.mount('#app')