<!-- -->
<template>
  <div>
    <div id="main3" style="width: 100%; height: 400px; margin: 15px 0; border: 1px solid #333; box-shadow: 5px 5px 5px #888888"></div>
  </div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, reactive, ref } from 'vue'
import axios from 'axios'
const main = ref()
const lineList = reactive({
  xdata: [],
  Bento: [],
  snack: [],
  bowl: [],
  dining: [],
})
onMounted(() => {
  init()
})
const init = async () => {
  await axios.get('https://c4156a34-94b2-4302-969f-e96f6277625a.bspapp.com/chart').then((res) => {
    lineList.xdata = res.data.xdata
    lineList.Bento = res.data.Bento
    lineList.snack = res.data.snack
    lineList.bowl = res.data.bowl
    lineList.dining = res.data.dining
  })
  // 1通过dom初始化echarts 2ref虚拟化dom
  //let mychart = echarts.init(main.value)
  let mychart = echarts.init(document.getElementById('main3') as HTMLElement)
  //let mychart = echarts.init(main.value)
  var ch_credit_in_major =echarts.init(document.getElementById('main3')!);

  window.addEventListener('resize', function () {
    mychart.resize()
  })
  // 数据源
  var option = {
    title: {
      text: '类目销售周报',
      x: 'center',
    },
    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      top: '10%',
    },
    xAxis: {
      type: 'category',
      // 刻度线boundary
      boundaryGap: false,
      data: lineList.xdata,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '便当套餐',
        type: 'line',
        // 堆叠
        stack: '销量',
        // 平滑
        smooth: true,
        lineStyle: {
          width: 0,
        },
        // 隐藏所有数据点
        showSymbol: false,
        areaStyle: {
          // 透明度
          opacity: 0.8,
          // 颜色渐变
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(128,255,165)',
            },
            {
              offset: 0,
              color: 'rgb(1,191,236)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: lineList.Bento,
      },
      {
        name: '小吃熟食',
        type: 'line',
        // 堆叠
        stack: '销量',
        // 平滑
        smooth: true,
        lineStyle: {
          width: 0,
        },
        // 隐藏所有数据点
        showSymbol: false,
        areaStyle: {
          // 透明度
          opacity: 0.8,
          // 颜色渐变
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(0,211,255)',
            },
            {
              offset: 0,
              color: 'rgb(77,119,255)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: lineList.snack,
      },
      {
        name: '盖浇饭',
        type: 'line',
        // 堆叠
        stack: '销量',
        // 平滑
        smooth: true,
        lineStyle: {
          width: 0,
        },
        // 隐藏所有数据点
        showSymbol: false,
        areaStyle: {
          // 透明度
          opacity: 0.8,
          // 颜色渐变
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(55,162,255)',
            },
            {
              offset: 0,
              color: 'rgb(116,21,219)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: lineList.bowl,
      },
      {
        name: '轻食简餐',
        type: 'line',
        // 堆叠
        stack: '销量',
        // 平滑
        smooth: true,
        lineStyle: {
          width: 0,
        },
        // 隐藏所有数据点
        showSymbol: false,
        areaStyle: {
          // 透明度
          opacity: 0.8,
          // 颜色渐变
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255,0,135)',
            },
            {
              offset: 0,
              color: 'rgb(135,0,157)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: lineList.dining,
      },
    ],
  }
  // 数据源给予
  mychart.setOption(option)
}
</script>
<style lang="scss" scoped></style>
