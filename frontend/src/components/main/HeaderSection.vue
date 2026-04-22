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
  <div class="flex items-center justify-between mb-4">
    <div>
      <h1 class="text-xl font-semibold text-gray-900">
        {{ getGreeting() }}, {{ userName }}
      </h1>
    </div>
    
    <div class="flex items-center gap-2">
      <button class="btn btn-ghost btn-circle btn-sm">
        <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>
        </svg>
      </button>
      
      <div class="relative">
        <button class="btn btn-ghost btn-circle btn-sm">
          <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
          </svg>
        </button>
        <span v-if="notificationCount > 0" class="badge badge-error badge-xs absolute top-1 right-1 w-1.5 h-1.5 p-0"></span>
      </div>
      
      <div class="h-5 w-px bg-gray-200 mx-0.5"></div>
      
      <div class="group relative">
        <div class="flex items-center gap-2 cursor-pointer rounded-lg px-2 py-1.5 transition-all duration-300 bg-white border border-gray-100 hover:border-gray-300 hover:shadow-sm hover:shadow-gray-100/50">
          <div class="avatar relative">
            <div class="w-9 h-9 rounded-full bg-gradient-to-br from-blue-50 to-gray-50 border-2 border-white shadow-sm group-hover:scale-105 transition-transform duration-300">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Anika"
                alt="avatar"
              />
            </div>
          </div>

          <div class="flex flex-col items-start min-w-0">
            <span class="text-xs font-semibold text-gray-900 truncate max-w-[100px]">{{ userFullName }}</span>
            <span class="text-[11px] text-gray-500 truncate max-w-[100px]">{{ userEmail }}</span>
          </div>

          <svg
            class="w-3.5 h-3.5 text-gray-400 ml-0.5 transition-transform duration-300 group-hover:rotate-180 group-hover:text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>

        <!-- Dropdown menu (hidden by default, can be toggled with JS) -->
        <div class="absolute right-0 top-full mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
          <div class="bg-white rounded-xl shadow-lg border border-gray-200 py-2 overflow-hidden">
            <div class="px-4 py-3 border-b border-gray-100">
              <p class="text-sm font-medium text-gray-900">{{ userFullName }}</p>
              <p class="text-xs text-gray-500 mt-0.5">{{ userEmail }}</p>
            </div>
            <div class="py-1">
              <a href="#" class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                Profile
              </a>
              <a href="#" class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                Settings
              </a>
              <a href="#" class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="border-b border-gray-100"></div>
</template>
