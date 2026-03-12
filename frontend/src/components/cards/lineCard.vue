<script setup>
import * as echarts from 'echarts';
import { defineProps, useTemplateRef, onMounted } from 'vue';


const props = defineProps({
  name: String,
  totalValue: Number,
  data: Array
})

let lineChart;
const lineChartDom = useTemplateRef('lineChart'); // 修改ref名称以匹配模板

onMounted(async () => {
  lineChart = echarts.init(lineChartDom.value);
  
  // 提取时间和数值数据
  const timeData = props.data.map(item => item.time);
  const valueData = props.data.map(item => item.value);
  
  // 计算y轴最大最小值
  const actualMin = Math.min(...valueData);
  const actualMax = Math.max(...valueData);
  const dataRange = actualMax - actualMin;
  const padding = dataRange * 0.1; // 10% padding
  
  const option = {
    xAxis: {
      type: 'category',
      data: timeData,
      boundaryGap: false,
      // x轴线设置
      axisLine: {
        lineStyle: {
          color: '#f0f0f5'
        }
      },
      // x轴刻度线设置
      axisTick: {
        show: false
      },
      axisLabel: {
        alignMinLabel: 'left',
        alignMaxLabel: 'right'
      }
    },
    yAxis: {
      type: 'value',
      min: actualMin - padding,
      max: actualMax + padding,
      splitNumber: 5,
      axisLine: {
        show: false
      },
      axisLabel: {
        show: true,
        verticalAlignMinLabel: 'bottom',
        verticalAlignMaxLabel: 'top'
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: '#f0f0f5'
        }
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '0%',
      right: '0%',
      top: '0%',
      bottom: '0%',
      containLabel: true  // 确保坐标轴标签也被考虑在内
    },
    series: [{
      data: valueData,
      type: 'line',
      smooth: false,
      showSymbol: false, // 不显示数据点
      lineStyle: {
        color: '#93c5fd', // 淡蓝色
        width: 2
      }
    }]
  };
  
  lineChart.setOption(option);
});
</script>

<template>
  <div class="flex flex-col h-full">
    <header>
      <div class="flex flex-col">
        <div class="flex">
          <span class="text-sm font-medium text-zinc-950/70">{{ props.name }}</span>
        </div>
        <span class="mt-1 text-xl font-semibold">{{ props.totalValue }}</span>
      </div>
    </header>

    <main class="mt-8 flex-1">
      <div ref="lineChart" class="h-full"></div>
    </main>
  </div>
</template>

<style scoped>

</style>