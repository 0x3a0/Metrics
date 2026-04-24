<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', routeName: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { id: 'accounts', label: 'Accounts', routeName: 'Accounts', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { id: 'settings', label: 'Settings', routeName: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' }
]
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="p-6 border-b border-gray-100 select-none">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
        </div>
        <span class="text-xl font-semibold text-gray-900">Metrics</span>
      </div>
    </div>

    <nav class="flex-1 p-3 space-y-1 mt-2">
      <router-link
        v-for="item in menuItems"
        :key="item.id"
        :to="{ name: item.routeName }"
        :class="[
          'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 border focus:outline-none focus:border-gray-200',
          route.name === item.routeName
            ? 'bg-white border-gray-200 text-gray-900 font-medium shadow-2xs'
            : 'text-gray-700 border-transparent hover:bg-white hover:border-gray-200 hover:text-gray-900'
        ]"
      >
        <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon"/>
        </svg>
        <span>{{ item.label }}</span>
      </router-link>
    </nav>
  </div>
</template>
