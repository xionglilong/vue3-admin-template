import { Module } from "vuex";
import {Itab} from '../type'
import { RootState } from "../index";


export interface TabState{

  tabList:Array<Itab>
  contextMenuTab:string
}

export const tabStore:Module<TabState,RootState> ={
  namespaced:true,
    state:{
    tabList:[],
    contextMenuTab:''
  },

  mutations:{
    // 添加tab
      addTab(state:TabState,tab:Itab){
        const isSome = state.tabList.some((item)=> item.path == tab.path)
        if(!isSome){
          state.tabList.push(tab)
        }
      },
    //删除tab
      closeCurrentTab(state:TabState,targetName:string){
        const index = state.tabList.findIndex((item) => item.path == targetName)
        state.tabList.splice(index,1)
      },

      //右键打开菜单保存path
      saveCurrentContextTabId(state:TabState,curtextMenuTab){
          state.contextMenuTab = curtextMenuTab
      },

      // 删除所有tab
      closeAllTabs(state:TabState){
        state.tabList = []
        sessionStorage.removeItem('TABS_ROUTES')
      },

      //删除其他tab
      closeOtherTabs(state:TabState,par:string){
        if(par == 'other' ){
          state.tabList = state.tabList.filter((item) => item.path == state.contextMenuTab)
        }else if(par == 'left'){
          const index = state.tabList.findIndex((item)=> item.path == state.contextMenuTab)
          state.tabList.splice(0,index)
        }else if(par == 'right'){
          const index = state.tabList.findIndex((item)=> item.path == state.contextMenuTab)
          state.tabList.splice(index + 1)
        }
      }
    },
    getters:{
      getAddTab(state:TabState){
          return state.tabList
      }
    }
  
}