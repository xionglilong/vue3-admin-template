<template>
  <div>
    <!-- 标题栏 -->
    <div class="logo-container h-11 pt-2 pb-5 flex items-center justify-center box-content">
      <el-avatar icon="el-icon-user-solid" :size="44" shape="square" src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png" style="--el-avatar-bg-color: none"></el-avatar>
      <span class="logo-title ml-2 font-semibold leading-[50px] text-[16px] whitespace-nowrap" v-if="settingStore.sidebarOpened">项目标题</span>
    </div>

    <el-scrollbar>
      <!-- 一级 menu 菜单 -->
      <el-menu
        router
        :default-active="router.path"
        :uniqueOpened="true"
        default-active="2"
        :background-color="themeStore.mainBg"
        :text-color="themeStore.mainText"
        :active-text-color="themeStore.activeText"
        :collapse="!settingStore.sidebarOpened"
        style="--el-menu-item-font-size: 14px"
        :collapse-transition = 'false'
        >
        <!-- 固定菜单 -->
        <!--
        <el-sub-menu index="1">
          <template #title>
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <template #title>导航四</template>
        </el-menu-item>
        -->

        <!-- 路由菜单 -->
        <el-sub-menu v-for="(firstRoute, index) in menus" :key="firstRoute.path" :index="String(index+1)">
          <template #title>
            <el-icon><SvgIcon :icon="firstRoute.meta.icon"></SvgIcon></el-icon>
            <span class="text-base">{{firstRoute.meta.title}}</span>
          </template>
            <el-menu-item v-for="secondRoute in firstRoute.children"
              :key="secondRoute.path"
              :index="secondRoute.path"
              >
              <el-icon><SvgIcon :icon="secondRoute.meta.icon"></SvgIcon></el-icon>
              <template #title>{{secondRoute.meta.title}}</template>
            </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import {} from 'vue'
import { useRouter } from 'vue-router'
import useSettingStore from '@/store/settings'
import useThemeStore from '@/store/theme'
import SvgIcon from '@/components/SvgIcon.vue'

const settingStore = useSettingStore()
const themeStore = useThemeStore()
const router = useRouter()
const routes = router.getRoutes()

// ---------------------- 通过路由获取菜单项 --------------------
// 获取所有子路由
const childrenRoutes = []
routes.forEach(route => {
  JSON.stringify(route.children) !== '[]' && childrenRoutes.push(...route.children)  // if简写
})
// 获取过滤出的不重复路由（去掉重复的子路由）
const filterRoutes = routes.filter(route => {
  const hasChildrenRoute = childrenRoutes.find(childrenRoute => childrenRoute.path === route.path)
  return !hasChildrenRoute  // 如果查不到子路由则提取
})
// 提取一级菜单项
const menus = []
filterRoutes.forEach(firstRoute => {
  // 存在.meta.icon说明是菜单项
  if (firstRoute.meta && firstRoute.meta.title && firstRoute.meta.icon) {
    // 如果该菜单项有子菜单，则提取二级菜单项
    if (JSON.stringify(firstRoute.children) !== '[]') {
      const children = []
      firstRoute.children.forEach(secondRoute => {
        // 存在.meta.icon说明是菜单项
        if (secondRoute.meta && secondRoute.meta.title && secondRoute.meta.icon) children.push(secondRoute)
      })
      firstRoute.children = children // 将过滤的二级路由替换上去
    }
    menus.push(firstRoute)
  }
})
// ------------------------------------------------------------

</script>

<style lang="scss" scoped>
.logo-title {
  color: v-bind('themeStore.mainText')
}



</style>