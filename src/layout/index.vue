<template>
  <div class="app-wrapper relative h-full w-full after:table after:clear-both">
    <!-- 侧边栏 -->
    <sidebar class="sidebar-container fixed top-0 bottom-0 left-0 z-50 h-full transition-w duration-300 overflow-hidden" :class="[settingStore.sidebarOpened ? 'w-52' : 'w-16']" />  
    <!-- 页面右侧 -->
    <div class="main-container relative ml-52 min-h-full transition-ml duration-300" :class="[settingStore.sidebarOpened ? 'ml-52' : 'ml-16']">
      <div class="fixed-header fixed top-0 right-0 z-10 transition-w duration-300" :class="[settingStore.sidebarOpened ? 'w-[calc(100%-210px)]' : 'w-[calc(100%-64px)]']"> 
        <!-- 顶部 navbar -->
        <Navbar />
        <!-- tags 标签栏 -->
        <tags-view />
      </div>  
      <!-- 内容区域 -->
      <app-main />  
    </div>
  </div>
</template>
  
<script setup>
import Navbar from './components/navbar/Navbar.vue'
import Sidebar from './components/sidebar/Sidebar.vue'
import AppMain from './components/app-main/AppMain.vue'
import TagsView from './components/tags-view/TagsView.vue'

import useSettingStore from '@/store/settings'
import useThemeStore from '@/store/theme'

const themeStore = useThemeStore()
const settingStore = useSettingStore()
</script>


<style lang="scss" scoped>
.sidebar-container {
  background-color: v-bind('themeStore.mainBg');
}
</style>