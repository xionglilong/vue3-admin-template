<template>
  <div class="app-wrapper relative h-full w-full after:table after:clear-both">
    <sidebar class="sidebar-container fixed top-0 bottom-0 left-0 z-50 w-52 h-full bg-orange-600 transition-w duration-300 overflow-hidden" />  <!-- 左边的侧边栏组件 -->
    <div class="main-container relative ml-52 min-h-full transition-ml duration-300">
      <div class="fixed-header fixed top-0 right-0 z-10 w-[calc(100%-210px)]"> <navbar /> </div>  <!-- 顶部 navbar -->
      <app-main />  <!-- 内容区域 -->
    </div>
  </div>
</template>
  
<script setup>
import Navbar from './Navbar.vue'
import Sidebar from './Sidebar.vue'
import AppMain from './AppMain.vue'
</script>

<style lang="scss" scoped>
</style>