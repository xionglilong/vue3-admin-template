<!-- -->
<template>
<div>
<div
ref="mains"
style="width: 100%; height: 815px; margin:15px 0 ; border: 1px solid
#333 ;box-shadow: 5px 5px 5px #888888;"
></div>
</div>
</template>
<script setup lang='ts'>
import * as echarts from "echarts";
import axios from 'axios'
import { onMounted, ref,watch } from "vue";
import { chinaMap } from '../../../assets/map/china'
const mains = ref()
onMounted(
() => {
init()
}
)
const props = defineProps({
mapList:{
type:Array,
required:true,
default:[]
}
})
const data = ref([])
const init = async () => {
await axios.get('https://c4156a34-94b2-4302-969f-e96f6277625a.bspapp.com/map').then(res=>{
data.value = res.data
})
console.log(props.mapList)
let myChart = echarts.init(mains.value);
echarts.registerMap('chinaMap', chinaMap as any)
let option = {
title:{
text:'门店销量排行榜',
x:'center'
},
tooltip: {
trigger: 'item'
},
geo: {
map: "chinaMap",
type: 'map',
zoom: 1.2,
itemStyle: {
areaColor: '#009fcc',
borderColor: '#00ffff',
shadowColor: 'rgba(230,130,70,0.5)',
shadowBlur: 30,
emphasis: {
focus: 'self',
areaColor: 'yellow',//鼠标选择区域颜色
shadowBlur: 20,
borderWidth: 0,
shadowColor: 'rgba(0, 0, 0, 0.5)'
}
}
},
visualMap: {
left: 'right',
min: 100,
max: 400,
inRange: {
color: [
'#313695',
'#4575b4',
'#74add1',
'#abd9e9',
'#e0f3f8',
'#ffffbf',
'#fee090',
'#fdae61',
'#f46d43',
'#d73027',
'#a50026'
]
},
text: ['High', 'Low'],
calculable: true
},
series: [{
type: 'scatter', // 特效散点图，也可用普通散点图scatter
coordinateSystem: 'geo', // 坐标系使用geo，以地图作为底图
itemStyle: {
borderColor: '#06B9D1',
color: 'red'
},
data: data.value,
encode: {
value: 2
},
}]
};
myChart.setOption(option)
}
</script>
<style lang='scss' scoped>
</style>
