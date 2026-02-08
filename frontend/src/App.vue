<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

import SidebarLayout from '@/components/sidebars/sidebarLayout.vue';
import SidebarContent from '@/components/sidebars/sidebarContent.vue';
import DashboardIcon from '@/components/icons/dashboardIcon.vue';
import SettingIcon from '@/components/icons/settingIcon.vue';
import LineCard from "@/components/cards/lineCard.vue";
import TreemapCard from "@/components/cards/treemapCard.vue";
import InventoryTable from '@/components/tables/inventoryTable.vue';


const data = {
  sidebar: {
    webName: "Metrics",
    content: [
      {
        "id": 1,
        "title": "Dashboard",
        "icon": DashboardIcon
      },
      {
        "id": 2,
        "title": "Setting",
        "icon": SettingIcon
      }
    ]
  },
  lineChart: {
    name: "库存分析",
    totalValue: 1883,
    data: [
      {
        "time": "2026/1/13 16:41:00",
        "value": 1220
      },
      {
        "time": "2026/1/13 16:42:00",
        "value": 1228
      },
      {
        "time": "2026/1/13 16:43:00",
        "value": 1250
      },
      {
        "time": "2026/1/13 16:44:00",
        "value": 1182
      },
      {
        "time": "2026/1/13 16:45:00",
        "value": 1241
      },
    ]
  }
}

let inventories = ref([]);
// 时间
const timeQuantum = ref("");
const isBind = ref(false);

// 计算当前时间
const judgeTimeQuantum = () => {
  const hour = new Date().getHours();
  if (hour > 6 && hour < 12) {
    timeQuantum.value = "早上好";
  } else if  (hour >= 12 && hour < 18) {
    timeQuantum.value = "下午好"
  } else {
    timeQuantum.value = "晚上好";
  }
  console.log(timeQuantum.value)
}

onMounted(() => {
  judgeTimeQuantum();
}
)
</script>

<template>
  <sidebar-layout :webName="data.sidebar.webName">
    <template v-slot:sidebar-content>
      <SidebarContent :items="data.sidebar.content"></SidebarContent>
    </template>

    <template v-slot:main-content>
      <div v-if="!isBind" class="h-full flex-1 flex items-center justify-center">
        <div class="loading loading-ring loading-xl"></div>
      </div>
      <div v-else>
        <h1 class="text-2xl/6 font-semibold">{{ timeQuantum }}</h1>
        <div class="mt-8 flex flex-row h-90 gap-8">
          <!-- 估值分析折线图 -->
          <div class="flex-3">
            <LineCard :name="data.lineChart.name" :totalValue="data.lineChart.totalValue" :data="data.lineChart.data"></LineCard>
          </div>
          <!-- treemap -->
          <div class="flex-2">
            <TreemapCard></TreemapCard>
          </div>
        </div>

        <div class="mt-10">
          <!-- 库存表格 -->
          <InventoryTable :inventories="inventories"></InventoryTable>
        </div>
      </div>
    </template>
  </sidebar-layout>
</template>

<style scoped></style>
