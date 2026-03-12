<script setup>
import * as echarts from 'echarts';
import { useTemplateRef, onMounted } from 'vue';


const treemapChartDom = useTemplateRef('treemap');
let treemapChart;
onMounted(() => {
  treemapChart = echarts.init(treemapChartDom.value);
  const option = {
    series: [
      {
        type: 'treemap',
        left: '0%',
        right: '0%',
        top: '0%',
        bottom: '0%',
        // 面包屑，节点路径显示设置
        breadcrumb: {
          show: false
        },
        data: [
          {
            name: 'nodeA',
            value: 10,
            children: [
              {
                name: 'nodeAa',
                value: 4
              },
              {
                name: 'nodeAb',
                value: 6
              }
            ]
          }
        ]
      }
    ]
  };

  treemapChart.setOption(option);
})
</script>

<template>
  <div class="h-full card">
    <div ref="treemap" class="h-full"></div>
  </div>
</template>

<style scoped>

</style>