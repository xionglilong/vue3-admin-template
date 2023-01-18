<template>
  <div>
    <!-- 外部图标 -->
    <div
      v-if="isExternal"
      :style="styleExternalIcon"
      class="svg-external-icon svg-icon"
      :class="className"
    ></div>

    <!-- element-plus图标 -->
    <component v-else :is="iconComponent"></component>
  </div>
</template>

<script setup>
// 将图标全部注册进来（import后自动注册组件）
import * as Icons from '@element-plus/icons-vue'

import { computed } from 'vue'
const props = defineProps({
  // icon 图标
  icon: {
    type: String,
    required: true
  },
  // 图标类名
  className: {
    type: String,
    default: ''
  }
})

// 判断是否为外部图标
const isExternal = computed(() => {
  return /^(https?:|mailto:|tel:)/.test(props.icon)
})


// 如果是element-plus图标，将具体组件绑定到变量中。用于component标签使用。
let iconComponent = null
if (!isExternal.value) {
  iconComponent = Icons[props.icon]
} 

/**
 * 外部图标样式
 */
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
}))




</script>


<script>
/**
 * 注意！
 * https://cn.vuejs.org/api/sfc-script-setup.html#using-components
 * 在 <script setup> 中要使用动态组件时，需要直接用 :is="Component" 直接绑定到组件本身，而不是字符串的组件名。
 * 如果想使用字符串绑定 :is="'DArrowRight'"，这里新建一个script标签并使用vue2语法导入组件。
 */

/*
import { DArrowRight, DArrowLeft, Search } from '@element-plus/icons-vue'
export default {
  components: { DArrowLeft, DArrowRight, Search }
}
*/
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>