<!--  -->
<template>
<div>
    <el-breadcrumb>
    <el-breadcrumb-item
    v-for="(item,index) in breadcrumb" :key="index"
    >{{item.meta.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</div>
</template>

<script setup lang='ts'>

import { Ref, ref ,watch} from 'vue';
import { useRoute ,RouteLocationMatched} from 'vue-router';
const route = useRoute()

const breadcrumb:Ref<RouteLocationMatched[]> = ref([])

const getBreadCrumb = ()=>{
  // 过滤路由信息
  let matched = route.matched.filter((item)=>item.meta && item.meta.title && item.children.length !== 1)

  //拿到第一条数据
  const first = matched[0]
  //判断
  if(first.path !== './index'){
      matched = [{path:'/index',meta:{title:'首页'}} as any].concat(matched)
  }

  breadcrumb.value = matched
}
//初始化运行
getBreadCrumb()
//监控路由，如果路由发生变化，那么面包屑数据变化
watch(()=>route.path,()=>{
  getBreadCrumb()
})
</script>
<style lang='scss' scoped>
</style>