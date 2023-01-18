<template>
  <el-breadcrumb class="breadcrumb inline-block ml-2 text-sm" style="line-height: 50px" separator="/">
    <!-- 固定面包屑 -->
    <!--
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    <el-breadcrumb-item>
      <span class="no-redirect">活动详情</span>
    </el-breadcrumb-item>
    -->

    <!-- 动态面包屑 -->
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbData" :key="item.path">
        <!-- 不可点击项目 -->
        <span v-if="index === breadcrumbData.length -1" class="no-redirect">{{ item.meta.title }}</span>
        <!-- 可点击项 -->
        <a v-else class="redirect" @click.prevent="onLinkClick(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
    
    
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import router from '../../../../router';

// 接受父组件传递属性
defineProps({
  color: { type: String, default: '#97a8be'}
})

const route = useRoute()
// ---------------------- 生成数组数据 ----------------------
const breadcrumbData = ref([])
// 使用到 route.match 属性来：获取与给定路由地址匹配的标准化的路由记录数组
const getBreadcrumbData = () => {
  breadcrumbData.value = route.matched.filter(
    item => item.meta && item.meta.title
  )
}
// 监听路由变化时触发
watch(
  route,
  () => {
    getBreadcrumbData()
  },
  {
    immediate: true
  }
)

// ---------------- 处理点击事件 ------------------
const onLinkClick = item => router.push(item.path)
</script>


<style lang="scss" scoped>
.breadcrumb {
  :v-deep(.no-redirect) {
    color: v-bind('color');
    cursor: text;
  }
}


// 动画

.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter-from,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-leave-active {
  position: absolute;
}



</style>