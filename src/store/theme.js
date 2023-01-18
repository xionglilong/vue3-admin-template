// 关于项目的主题配置

import { defineStore } from 'pinia'

const useThemeStore = defineStore('theme', () => {
  // 主题色
  const themeName = ref('克莱因蓝')
  const mainBg = ref('rgb(27,55,121)')
  const secondaryBg = ref('rgb(27,55,121)')
  const mainText = ref('rgb(242,240,235)')
  const secondaryText = ref('rgb(242,240,235)')
  const activeText = ref('rgb(255,255,255)')

  // 本地主题列表
  const themeList = [
    {
      name: '朱砂红',
      mainBg: 'rgb(242,25,33)',
      secondaryBg: 'rgb(242,25,33)',
      mainText: 'rgb(252,240,235)',
      secondaryText: 'rgb(255,240,235)',
      activeText: '#93ACBC'
    }
  ]

  // 返回主题名称列表
  function getThemeNameList() {
    nameList = []
    themeList.forEach(theme => nameList.push(theme.name))
    return nameList
  }

  // 修改主题
  function changeTheme(name) {
    themeList.forEach(theme => {
      if (theme.name === name) {
        // 如果查询到该主题，则将属性一个个替换掉
        for (let key in theme) {
          this[key] = theme[key]
        }
      }
    })
  }

  return { mainBg, secondaryBg, mainText, secondaryText, activeText, changeTheme, getThemeNameList }
})

export default useThemeStore