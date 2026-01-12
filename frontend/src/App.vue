<script setup>
import SidebarLayout from '@/components/sidebars/sidebarLayout.vue';
import SidebarContent from '@/components/sidebars/sidebarContent.vue';
import DashboardIcon from '@/components/icons/dashboardIcon.vue';
import SettingIcon from '@/components/icons/settingIcon.vue';
import PieCard from '@/components/cards/pieCard.vue';
import InfoCard from '@/components/cards/infoCard.vue';
import LineChart from "@/components/cards/lineChart.vue";


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
  infoCard: [
    {
      "id": 1,
      "title": "库存数量",
      "value": 66,
      "trend": 3.5
    },
    {
      "id": 2,
      "title": "库存估值",
      "value": 1800,
      "trend": -10
    }
  ],
  pieCard: {
    name: "库存组成",
    data: [
      {
        "name": "步枪",
        "value": 800
      },
      {
        "name": "手枪",
        "value": 300
      },
      {
        "name": "武器箱",
        "value": 120
      },
      {
        "name": "匕首",
        "value": 1300
      }
    ]
  }
}
</script>

<template>
  <sidebar-layout :webName="data.sidebar.webName">
    <template v-slot:sidebar-content>
      <SidebarContent :items="data.sidebar.content"></SidebarContent>
    </template>

    <template v-slot:main-content>
      <!-- main infoCard container -->
      <div class="mt-8 grid grid-cols-3 gap-4">
        <InfoCard :items="data.infoCard"></InfoCard>
      </div>

      <!-- main pieCard container -->
      <div class="mt-4 grid grid-cols-2 gap-4">
        <PieCard :name="data.pieCard.name" :data="data.pieCard.data"></PieCard>
        <LineChart></LineChart>
      </div>
    </template>
  </sidebar-layout>
</template>

<style scoped></style>
