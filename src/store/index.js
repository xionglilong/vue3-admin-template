import { createPinia } from 'pinia'

const pinia = createPinia()

export default pinia

// 这里需要单独创建一个pinia实例，并在main.ts中注册，也可以被其他模块引用
// 如果直接在main.ts中创建并注册，那么可能在注册前就需要使用pinia就会报错，比如在permissions.js中使用