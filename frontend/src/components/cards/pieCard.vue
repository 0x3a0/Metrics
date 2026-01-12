<script setup>
import * as echarts from 'echarts';
import {defineProps, useTemplateRef, onMounted, watch} from 'vue';


const props = defineProps({
  name: String,
  data: {
    type: Array
  }
})

let pieChart;
const pieChartDom = useTemplateRef("pieChart");

// DOM节点创建后初始化pieChart图表
onMounted(() => {
  pieChart = echarts.init(pieChartDom.value);
  pieChart.setOption({
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    },
    series: [
      {
        type: "pie",
        radius: ["58%", "70%"],
        itemStyle: {
          borderRadius: 5,
          borderColor: "#fff",
          borderWidth: 3
        },
        labelLine: {
          show: false
        },
        data: props.data
      },
    ]
  });
  window.addEventListener('resize', () => {
    pieChart.resize()
  })
});
</script>

<template>
  <div class="h-90 border border-zinc-950/10 rounded-md">
    <div class="h-full p-5 flex flex-col">
      <header class="text-base font-medium text-zinc-700">
        <span>{{props.name}}</span>
      </header>

      <main class="flex-1 flex gap-4">
        <div ref="pieChart" class="h-full flex-2"></div>
        <div class="flex-1 p-2 grid grid-4 items-center">
          <div v-for="item in props.data" class="">
            {{item.name}}
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>

</style>