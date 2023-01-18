// 关于系统内部的使用

import { defineStore } from 'pinia'

const useSystemStore = defineStore('system', () => {
  // 标签栏数据，里面是route对象列表
  const tagsViewList = ref([])

  // 将route对象添加进列表
  function addTagsViewList(route) {
    const isFind = tagsViewList.value.find(item => {
      return item.path === route.path
    })
    // 处理重复
    if (!isFind) {
      tagsViewList.value.push(route)
    }
  }

  // 关闭标签也
  function removeTagsView(payload) {
    // 关闭指定页面
    if (payload.type === 'index') {
      tagsViewList.value.splice(payload.index, 1)
      return
    // 关闭其他所有页面
    } else if (payload.type === 'other') {
      tagsViewList.value.splice(
        payload.index + 1,
        tagsViewList.value.length - payload.index + 1
      )
      tagsViewList.value.splice(0, payload.index)
    // 关闭右侧所有页面
    } else if (payload.type === 'right') {
      tagsViewList.value.splice(
        payload.index + 1, 
        tagsViewList.value.length - payload.index + 1
      )
    }

  }


  return { tagsViewList, addTagsViewList, removeTagsView }
})

export default useSystemStore