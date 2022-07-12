import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {store,key} from './store'
import * as ElIcons from '@element-plus/icons'

const app = createApp(App)
for(const name in ElIcons){
  app.component(name,(ElIcons as any)[name])
}
app.use(router).use(store,key).mount('#app')
