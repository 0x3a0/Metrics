<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  account: { type: Object, default: null },
  accounts: { type: Array, default: () => [] },
  activeAccount: { type: Object, default: null }
})

const emit = defineEmits(['switch-account'])

const dropdownOpen = ref(false)
const dropdownRef = ref(null)

const displayName = computed(() => {
  return props.activeAccount?.persona_name || props.account?.persona_name || 'User'
})

const displayAvatarUrl = computed(() => {
  return props.activeAccount?.avatar_url || props.account?.avatar_url || null
})

const hour = new Date().getHours()

const getGreeting = () => {
  if (hour < 12) return 'Good Morning'
  if (hour < 18) return 'Good Afternoon'
  return 'Good Evening'
}

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const handleClickOutside = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    dropdownOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
  <div class="flex items-center justify-between mb-4">
    <div>
      <h1 class="text-xl font-semibold text-gray-900">
        {{ getGreeting() }}, {{ displayName }}
      </h1>
    </div>

    <div ref="dropdownRef" class="relative select-none">
      <!-- Trigger -->
      <button
        @click="toggleDropdown"
        class="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 transition-colors duration-150"
        :class="dropdownOpen ? 'bg-gray-100' : 'hover:bg-gray-50'"
      >
        <div class="avatar">
          <div class="w-8 rounded-full ring-1 ring-gray-200">
            <img
              v-if="displayAvatarUrl"
              :src="displayAvatarUrl"
              :alt="displayName"
              draggable="false"
            />
            <div v-else class="bg-gray-100 h-full flex items-center justify-center">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
          </div>
        </div>
        <span class="text-sm font-medium text-gray-700 hidden sm:block">{{ displayName }}</span>
        <svg
          class="w-3.5 h-3.5 text-gray-400 transition-transform duration-150"
          :class="dropdownOpen ? 'rotate-180' : ''"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      <!-- Dropdown Panel -->
      <Transition
        enter-active-class="transition-all duration-150 ease-out"
        enter-from-class="opacity-0 -translate-y-1"
        leave-active-class="transition-all duration-100 ease-in"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <div
          v-if="dropdownOpen"
          class="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl border border-gray-200 shadow-lg shadow-gray-200/50 py-1 z-50"
        >
          <!-- Current user info -->
          <div class="px-4 py-3 border-b border-gray-100">
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="w-9 rounded-full ring-1 ring-gray-200">
                  <img
                    v-if="displayAvatarUrl"
                    :src="displayAvatarUrl"
                    :alt="displayName"
                  />
                  <div v-else class="bg-gray-100 h-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">{{ displayName }}</p>
                <p class="text-xs text-gray-500">{{ activeAccount ? '已绑定' : '未绑定账号' }}</p>
              </div>
            </div>
          </div>

          <!-- Account switching -->
          <div v-if="accounts.length > 0" class="py-1">
            <p class="px-4 py-1.5 text-xs font-medium text-gray-400 uppercase tracking-wider">切换账号</p>
            <button
              v-for="acct in accounts"
              :key="acct.steam_id"
              @click="emit('switch-account', acct); dropdownOpen = false"
              class="w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors duration-150"
              :class="
                activeAccount?.steam_id === acct.steam_id
                  ? 'bg-gray-50 text-gray-900 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              "
            >
              <div class="avatar">
                <div class="w-7 rounded-full ring-1 ring-gray-200">
                  <img
                    v-if="acct.avatar_url"
                    :src="acct.avatar_url"
                    :alt="acct.persona_name"
                  />
                  <div v-else class="bg-gray-100 h-full flex items-center justify-center">
                    <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <span class="truncate flex-1">{{ acct.persona_name }}</span>
              <svg
                v-if="activeAccount?.steam_id === acct.steam_id"
                class="w-4 h-4 text-emerald-500 shrink-0"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
              </svg>
            </button>
          </div>

          <!-- Actions -->
          <div class="border-t border-gray-100 mt-1 pt-1">
            <button class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              Settings
            </button>
            <button class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors duration-150">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </div>
  <div class="border-b border-gray-100"></div>
</template>
