<template>
  <el-tabs
    v-model="activeKey"
    type="card"
    @tab-click="clickHandle"
    @tab-remove="removeTab"
    @contextmenu.prevent.native="openContextMenu($event)"
  >
    <el-tab-pane
      v-for="item in tabList"
      :key="item.name"
      :label="item.title"
      :name="item.path"
      closable
    >
      {{ item.content }}
    </el-tab-pane>
  </el-tabs>
  <ul v-show="contextMenuVisible" :style="{left:left + 'px',top:top + 'px'}" class="contextMenu">
    <li @click="closeAllTabs">关闭所有</li>
    <li @click="closeOtherTabs('left')">关闭左边</li>
    <li @click="closeOtherTabs('right')">关闭右边</li>
    <li @click="closeOtherTabs('other')">关闭其他</li>
  </ul>
</template>
<script lang="ts" setup>
import { computed,onMounted,Ref,ref ,watch} from 'vue';
import { useStore } from '@/store/index';
import { useRoute ,useRouter} from 'vue-router';
import { Itab } from '@/store/type';
const store = useStore()
const route = useRoute()
const router = useRouter()
const tabList = computed(() => {
  return store.getters['tabStore/getAddTab']
})
//索引
const activeKey = ref('')
//添加tab
const addTab = ()=>{
  const{meta,path} = route
  const tab:Itab = {
    path:path,
    title:meta.title as string
  }
  store.commit('tabStore/addTab',tab)
}

//刷新缓存数据
const refresh = () => {
  window.addEventListener('beforeunload',() => {
    sessionStorage.setItem('TABS_ROUTES',JSON.stringify(tabList.value))
  })

  let session = sessionStorage.getItem('TABS_ROUTES')
  if(session){
   
    let tabItem = JSON.parse(session)
    tabItem.forEach((tab:Itab) => {
      store.commit('tabStore/addTab',tab)
    })
  }
}

refresh()
//监控
watch(()=>route.path,() =>{
  activeKey.value = route.path
  addTab()
},{immediate:true})

//点击tab切换
const clickHandle = (event:any) => {
  router.push({path:event.props.name})
}
//移除tab
const removeTab = (targetName:string) => {
  if(tabList.value.length === 1){
    return alert('这已经是最后一页')
  }

  //如果删除的是当前页
  if(activeKey.value === targetName){
    tabList.value.forEach((tab:Itab,index:number) => {
      if(tab.path === targetName){
        const nextTab = tabList.value[index + 1] || tabList.value[index - 1]
        if(nextTab){
          activeKey.value = nextTab.path
        }
      }
    })
  }
  store.commit('tabStore/closeCurrentTab',targetName)
}



// onMounted(()=> {
//   //初始化生成tab
//   addTab()
//   //刷新保存数据
//   refresh()
// })
// 右键显示删除菜单列表
const contextMenuVisible:Ref<boolean> = ref(false)
const left = ref('')
const top = ref('')
const openContextMenu = (e:any) =>{
  if(e.srcElement.id){
    let currentContextTabId= e.srcElement.id.split("-")[1]//截取字符串去掉tab 获取路由 字符串转字符串数组 数组是路由的第二位数，索引为1
    store.commit("tabStore/saveCurrentContextTabId",currentContextTabId)
    contextMenuVisible.value = true
    left.value = e.clientX
    top.value = e.clientY + 10
  }
}

// 关闭所有
const closeAllTabs = ()=> {
  store.commit('tabStore/closeAllTabs')
  contextMenuVisible.value = false
  router.push("/index")
}

//关闭其他（包含左，右，选中之外）
const closeOtherTabs = (par:string)=> {
    store.commit('tabStore/closeOtherTabs',par)
    contextMenuVisible.value = false
}

//监控右键删除列表，如果点击，就会消失
watch(()=>contextMenuVisible.value,()=>{
  if(contextMenuVisible.value){
    window.addEventListener("click",()=>contextMenuVisible.value = false)
  }else{
    window.removeEventListener("click",()=>contextMenuVisible.value = false)
  }
})
</script>
<style  lang="scss" scoped>
.contextMenu{
  width: 100px;
  margin: 0;
  border: 1px solid #ccc;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;// 去掉原生样式
  padding: 5px 0;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  box-shadow: 2px 2px 3px rgba(0,0,0,0.2);
  li{
    margin: 0;
    padding: 7px 16px;
    &:hover{
      background: #f2f2f2;
      cursor: pointer;
    }
  }
}

</style>
