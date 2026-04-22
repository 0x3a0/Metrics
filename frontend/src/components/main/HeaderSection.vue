<script setup>
import { ref } from 'vue'

const userName = ref('Anika')
const userFullName = ref('Anika Franci')
const userEmail = ref('anika@163.com')
const notificationCount = ref(3)

const currentTime = new Date()
const hour = currentTime.getHours()

const getGreeting = () => {
  if (hour < 12) return 'Good Morning'
  if (hour < 18) return 'Good Afternoon'
  return 'Good Evening'
}
</script>

<template>
  <div class="flex items-center justify-between mb-6">
    <div>
      <h1 class="text-2xl font-semibold text-gray-900">
        {{ getGreeting() }}, {{ userName }}
      </h1>
    </div>
    
    <div class="flex items-center gap-3">
      <button class="btn btn-ghost btn-circle">
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>
        </svg>
      </button>
      
      <div class="relative">
        <button class="btn btn-ghost btn-circle">
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
          </svg>
        </button>
        <span v-if="notificationCount > 0" class="badge badge-error badge-sm absolute top-2 right-2 w-2 h-2 p-0"></span>
      </div>
      
      <div class="h-6 w-px bg-gray-200 mx-1"></div>
      
      <div class="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors">
        <div class="avatar">
          <div class="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Anika" alt="avatar" />
          </div>
        </div>
        
        <div class="flex flex-col items-start">
          <span class="text-sm font-medium text-gray-900">{{ userFullName }}</span>
          <span class="text-xs text-gray-500">{{ userEmail }}</span>
        </div>
        
        <svg class="w-4 h-4 text-gray-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
    </div>
  </div>
</template>
