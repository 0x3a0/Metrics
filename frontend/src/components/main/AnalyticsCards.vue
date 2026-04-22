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
  <div class="mb-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold text-gray-900">Analytics Overview</h2>
      <div class="text-sm text-gray-500">Last 30 days</div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      <div
        v-for="item in analyticsData"
        :key="item.id"
        class="group relative bg-white rounded-lg border border-gray-100 p-4 hover:border-gray-200 transition-all duration-200 hover:shadow-xs"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-9 h-9 rounded-md bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <svg class="w-4.5 h-4.5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon"/>
                </svg>
              </div>
              <span class="text-sm font-medium text-gray-700">{{ item.title }}</span>
            </div>

            <div class="space-y-2">
              <div class="text-2xl font-bold text-gray-900 tracking-tight">{{ item.value }}</div>
              <div class="flex items-center gap-1.5">
                <div class="flex items-center gap-1">
                  <svg
                    v-if="item.trend === 'up'"
                    class="w-3.5 h-3.5 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
                  </svg>
                  <svg
                    v-else
                    class="w-3.5 h-3.5 text-rose-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                  </svg>
                  <span
                    :class="[
                      'text-sm font-medium',
                      item.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'
                    ]"
                  >
                    {{ item.change }}
                  </span>
                </div>
                <span class="text-xs text-gray-400">vs last month</span>
              </div>
            </div>
          </div>

          <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>

        <div class="mt-4 pt-3 border-t border-gray-50">
          <div class="text-xs text-gray-500">View details →</div>
        </div>
      </div>
    </div>
  </div>
</template>
