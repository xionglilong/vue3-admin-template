<!-- -->
<template>
  <div>
    <!-- <div id="main" style="width: 35%; height: 300px"></div> -->
        <div ref="main" style="width: 35%; height: 300px"></div>
  </div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted,ref } from 'vue'
const main = ref()
onMounted(() => {
  init()
})
const init = () => {
  // 方法一，使用dom初始化
  //let mychart = echarts.init(document.getElementById('main') as HTMLElement)
  // 方法二。使用ref虚拟化dom
  let mychart = echarts.init(main.value)
  var option = {
   
  }
  // 给予数据源
  mychart.setOption(option)
}
</script>
<style lang="scss" scoped></style>
