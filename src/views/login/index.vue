<template>
  <div class="login-container">
    <el-form class="login-form">
      <div class="title-container"> <h3 class="title">用户登录</h3> </div>  <!-- 标题 -->

      <el-form-item prop="username">
        <span class="svg-container"> <el-icon> <avatar /> </el-icon> </span>  <!-- 用户图标 -->
        <el-input placeholder="username" name="username" type="text" v-model="loginForm.username" />  <!-- 用户输入框 -->
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container"> <el-icon> <avatar /> </el-icon> </span>  <!-- 密码图标 -->
        <el-input placeholder="password" name="password" v-model="loginForm.password" />  <!-- 密码输入框 -->
        <span class="show-pwd"> <el-icon> <avatar /> </el-icon> </span>  <!-- 密码是否显示图标 -->
      </el-form-item>

      <el-button type="primary" style="width: 100%; margin-bottom: 30px" @click="handleLogin">登录</el-button>  <!-- 登录按钮 -->
    </el-form>
  </div>
  <!-- ---------------------------------------------------- -->

  <div>token:{{ token }}</div>
  <div>refresh:{{ refresh }}</div>

  <div>
    <div>正常取值</div>
    <div>{{ UserStore.name }} {{ UserStore.age }} {{ UserStore.token }}</div>
    <div>解构取值</div>
    <div>{{ name }} {{ age }} {{ token }}</div>
    <button @click="change1">change1</button>
    <button @click="change2">change2</button>
    <button @click="change3">change3</button>
    <button @click="change4">change4</button>
    <button @click="change5">change5</button>
  </div>
</template>

<script setup>
import { Avatar } from '@element-plus/icons-vue'
import {} from 'vue'

import { storeToRefs } from 'pinia'
import useUserStore from '@/store/user.js'

let UserStore = useUserStore()

const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})

const handleLogin = () => {
  UserStore.login(loginForm.value)
}





// 非响应式解构
// let { token, refresh } = UserStore
// 响应式解构
let { token, refresh } = storeToRefs(UserStore)
let { name, age } = storeToRefs(UserStore)

// 改变store中值的方式有五种
// 方式一
function change1() {
  UserStore.age++
}
// 方式二，可一次性修改多个值，对象的形式
function change2() {
  UserStore.$patch({
    name: '李四',
    age: 17
  })
}
// 方式三，可一次性修改多个值，函数的形式
function change3() {
  UserStore.$patch(state => {
    state.name = '王五'
    state.age = 19
  })
}
// 方式四，替换整个state对象
function change4() {
  UserStore.$state = {
    age: 20
  }
}
// 方式五，借助actions
function change5() {
  //也可以传参
  UserStore.setAge(999)
}
</script>