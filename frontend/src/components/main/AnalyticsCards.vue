<script setup>
import { ref } from 'vue'

const analyticsData = ref([
  {
    id: 1,
    title: 'Total Sales',
    value: '$45,231',
    change: '+12.5%',
    trend: 'up',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    id: 2,
    title: 'Orders',
    value: '1,234',
    change: '+8.2%',
    trend: 'up',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
  },
  {
    id: 3,
    title: 'Inventory',
    value: '8,543',
    change: '-2.4%',
    trend: 'down',
    icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
  },
  {
    id: 4,
    title: 'Active Users',
    value: '2,451',
    change: '+15.3%',
    trend: 'up',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
  }
])
</script>

<template>
  <div class="mb-8">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Analytics Overview</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="item in analyticsData"
        :key="item.id"
        class="card bg-base-100 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="card-body p-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon"/>
                </svg>
              </div>
              <span class="text-sm text-gray-500">{{ item.title }}</span>
            </div>
          </div>
          
          <div class="mt-3">
            <div class="text-2xl font-bold text-gray-900">{{ item.value }}</div>
            <div class="flex items-center gap-1 mt-1">
              <svg
                v-if="item.trend === 'up'"
                class="w-4 h-4 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
              </svg>
              <svg
                v-else
                class="w-4 h-4 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
              </svg>
              <span
                :class="[
                  'text-sm font-medium',
                  item.trend === 'up' ? 'text-green-500' : 'text-red-500'
                ]"
              >
                {{ item.change }}
              </span>
              <span class="text-xs text-gray-400">vs last month</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
