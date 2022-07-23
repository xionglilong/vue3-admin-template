<!--  -->
<template>
  <div>
    <el-row :gutter="20" style="width: 100%;" justify="end" align="middle">
      <el-col :xs="0" :sm="13" :md="13" :lg="19" :xl="19"> 
        <!-- 面包屑 -->
        <bread-crumb />
      </el-col>
      <el-col :xs="8" :sm="4" :md="4" :lg="1" :xl="1">
      <!-- 全屏 -->
        <screen-full></screen-full>
      </el-col>
      <el-col :xs="16" :sm="7" :md="7" :lg="4" :xl="4">
        <!-- 用户头像 -->
        <user-bar />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import BreadCrumb from './BreadCrumb.vue'
import UserBar from './UserBar.vue'
import ScreenFull from './ScreenFull.vue'
</script>
<style lang="scss" scoped></style>
