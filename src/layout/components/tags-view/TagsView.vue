<template>
  <div class="tags-view-container">
    <el-scrollbar class="tags-view-wrapper">
      <router-link
          class="tags-view-item"
          :class="isActive(route) ? 'active' : ''"
          :style="{
              backgroundColor: isActive(route) ? themeStore.mainBg : '',
              borderColor: isActive(route) ? themeStore.mainBg : ''
          }"
          v-for="(route, index) in systemStore.tagsViewList"
          :key="index"
          :to="{ path: route.fullPath }"
          @contextmenu.prevent="openMenu($event, index)"
      >
          <!-- 标签标题内容 -->
          {{ route.meta.title }}

          <!-- 标签关闭图标 -->
          <el-icon @click.prevent.stop="onCloseClick(index)" v-show="!isActive(route)">
            <SvgIcon icon="Close" />
          </el-icon>

      </router-link>
    </el-scrollbar>
    <ContextMenu v-show="isShowContextMenu" :style="menuStyle" :index="selectIndex"></ContextMenu>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import useSystemStore from '@/store/system'
import useThemeStore from '@/store/theme'
import { whiteList } from '@/permission'
import ContextMenu from './components/ContextMenu.vue'
import SvgIcon from '@/components/SvgIcon.vue'

const systemStore = useSystemStore()
const themeStore = useThemeStore()
const route = useRoute()

// -------------------------- tags 标签栏 -------------------------
// 监听路由变化
watch(
  route,
  (newRoute, oldRoute) => {
      // 如果是白名单的页面，则不添加到tags列表中
      if (whiteList.includes(newRoute.path)) return

      // route是响应式对象，要做一次深拷贝，新数据脱离响应式。不然推送到列表中的项都是一个数据。
      // JSON拷贝会爆出警告：https://blog.csdn.net/weixin_43245095/article/details/123091515
      // const copyNewRoute = JSON.parse(JSON.stringify(newRoute))
      const { meta, params, path, query, fullPath, name } = newRoute
      const copyNewRoute = { meta, params, path, query, fullPath, name}
      systemStore.addTagsViewList(copyNewRoute)
  },
  { immediate: true }
)

/**
* 是否被选中
*/
const isActive = tagRoute => {
  return tagRoute.path === route.path
}

/**
* 关闭当前tag的点击事件
*/
const onCloseClick = index => {
systemStore.removeTagsView({ type: 'index', index: index })
}



// -------------------------- contextMenu 右键上下文菜单 -------------------------

// 当前右键点击的标签索引
const selectIndex = ref(0)
// 是否展示右键菜单
const isShowContextMenu = ref(false)
// 右键菜单组件的style
const menuStyle = ref({ left: 0, top: 0})
// 展示 menu
const openMenu = (e, index) => {
const { x, y } = e
menuStyle.value.left = x + 'px'
menuStyle.value.top = y + 'px'
selectIndex.value = index
isShowContextMenu.value = true
}

// 关闭右键菜单
const closeContextMenu = ()=> {
isShowContextMenu.value = false
}
// 点击过后关闭右键菜单
watch(isShowContextMenu, (newValue, oldValue) => {
// 如果打开了右键菜单，则开始监听点击事件
if (newValue) {
  document.body.addEventListener('click', closeContextMenu)
} else {
  // 如果关闭了右键菜单，说明监听事件已经完成了任务，则取消监听'点击事件'。
  document.body.removeEventListener('click', closeContextMenu)
}
})
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
          margin-left: 15px;
      }
      &:last-of-type {
          margin-right: 15px;
      }
      &.active {
          color: #fff;
          &::before {
              content: '';
              background: #fff;
              display: inline-block;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              position: relative;
              margin-right: 4px;
          }
      }
      // close 按钮
      .el-icon-close {
          width: 16px;
          height: 16px;
          line-height: 10px;
          vertical-align: 2px;
          border-radius: 50%;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
          transform-origin: 100% 50%;
          &:before {
              transform: scale(0.6);
              display: inline-block;
              vertical-align: -3px;
          }
          &:hover {
              background-color: #b4bccc;
              color: #fff;
          }
      }
  }
}
</style>