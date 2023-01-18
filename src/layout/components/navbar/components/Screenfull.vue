<template>
  <div @click="onToggle">
      <el-icon>
          <svg-icon v-if="isFullscreen" icon="Close" />
          <svg-icon v-if="!isFullscreen" icon="FullScreen" />
      </el-icon>
  </div>
</template>

<script setup>
/**
* 全屏组件，直接可以使用，google和edge测试过了，火狐和weiket还没有测试
* 火狐和webkit的api可能不一样：`document.mozCancelFullScreen`，`document.webkitCancelFullScreen()`等等
* 如何要方便可是使用全屏框架：`npm install screenfull`
*/

import { ref } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'

// 是否全屏（图标显示使用）
const isFullscreen = ref(false)

// 切换事件
const onToggle = function () {
  if (document.fullscreenElement === null ? false : true) {
      document.exitFullscreen()
  } else {
    document.getElementById('app').requestFullscreen()
  }
isFullscreen.value = document.fullscreenElement !== null ? false : true
}
</script>

<style lang="scss">
// 注意如何元素没有设置背景颜色，默认全屏时的元素背景颜色是黑色
// 这里去掉了scode，在全局设置，设置#app根元素的全屏背景，用于继承到子元素
#app:fullscreen {
  background-color: rgba(255, 255, 255, 255);
}
#app:-webkit-full-screen {
  background-color: rgba(255, 255, 255, 255);
}
#app:-moz-full-screen {
  background-color: rgba(255, 255, 255, 255);
}
</style>