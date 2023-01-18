<template>
  <div class="navbar h-12 overflow-hidden relative bg-white shadow-sm shadow-slate-300">

    <!-- 伸缩侧边栏的切换按钮 -->
    <div class="px-4 leading-[46px] float-left cursor-pointer transition-[background] duration-500 hover:bg-slate-50" @click="toggleClick">
      <el-icon :color="themeStore.mainBg" class="inline-block align-middle w-5 h-5 ">
        <i-ep-DArrowLeft v-if="settingStore.sidebarOpened" />
        <i-ep-DArrowRight v-if="!settingStore.sidebarOpened" />
      </el-icon>
    </div>

    <!-- 动态面包 -->
    <breadcrumb class="breadcrumb-container float-left" :color="themeStore.mainText" />

    <!-- 全屏 -->
    <Screenfull class=" leading-[46px] float-right inline-block pr-4 text-2xl text-[#5a5e66] cursor-pointer"></Screenfull>

    <!-- 右边下拉栏 -->
    <div class="right-menu flex items-center float-right pr-4">
      <!-- 头像 -->
      <el-dropdown class="avatar-container cursor-pointer" :style="{ '--el-color-primary': themeStore.mainBg }" trigger="click" size="large" split-button type="primary" @command="">

        <div class="avatar-wrapper relative">
          <el-avatar :size="35" shape="square" :src="userStore.userinfo.avatar" style="--el-avatar-bg-color: none"></el-avatar>
          <i class="el-icon-s-tools"></i> 
        </div>

        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>
            <a href="" target="_blank">
              <el-dropdown-item>课程主页</el-dropdown-item>
            </a>
            <el-dropdown-item class=" cursor-pointer" @click="themeStore.changeTheme('朱砂红')">朱砂红主题</el-dropdown-item>

            <el-dropdown-item divided @click="userStore.logout">退出登录</el-dropdown-item>
            
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import Breadcrumb from '@/layout/components/navbar/components/Breadcrumb.vue'
import Screenfull from './components/Screenfull.vue'
import {} from 'vue'
import { storeToRefs } from 'pinia'
import useSettingStore from '@/store/settings'
import useUserStore from '@/store/user.js'
import useThemeStore from '@/store/theme.js'

const themeStore = useThemeStore()
const settingStore = useSettingStore()
const userStore = useUserStore()
// const { userinfo } = storeToRefs(userStore)
// console.log(userinfo)


// 侧边栏伸缩点击
const toggleClick = () => {
settingStore.triggerSidebarOpened()
}

</script>

<style lang="scss" scoped>

// 深度查找器，可匹配组件内元素
:v-deep(.avatar-wrapper) {
.el-avatar {
  --el-avatar-bg-color: none; // 头像背景透明
  margin-right: 12px;
}
}

</style>