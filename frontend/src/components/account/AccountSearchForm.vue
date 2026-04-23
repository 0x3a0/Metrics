<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  isSearching: {
    type: Boolean,
    default: false
  },
  isBinding: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: ''
  },
  searchResult: {
    type: Object,
    default: null
  },
  steamId: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['search', 'clear-error', 'bind', 'cancel', 'update:steamId'])


// 计算属性：搜索按钮是否禁用
const isSearchButtonDisabled = computed(() => {
  return props.isSearching || props.isBinding || !props.steamId.trim()
})

// 计算属性：绑定按钮是否禁用
const isBindButtonDisabled = computed(() => {
  return props.isBinding
})

// 计算属性：头像URL
const avatarUrl = computed(() => {
  if (!props.searchResult) return ''
  const hash = props.searchResult.avatar_url === '0000000000000000000000000000000000000000' 
    ? 'fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb'
    : props.searchResult.avatar_url
  return `https://avatars.cdn.steamchina.eccdnx.com/${hash}_full.jpg`
})

// 处理搜索
const handleSearch = () => {
  if (!props.steamId.trim()) {
    emit('search', '')
    return
  }
  emit('search', props.steamId.trim())
}

// 清空错误
const handleClearError = () => {
  emit('clear-error')
}

// 处理绑定
const handleBind = () => {
  emit('bind')
}

// 处理取消
const handleCancel = () => {
  emit('update:steamId', '')
  emit('clear-error')
  emit('cancel')
}

// 更新 Steam ID
const updateSteamId = (event) => {
  const newValue = event.target.value
  // 如果当前有搜索结果，且用户修改了输入值，则清除搜索结果
  if (props.searchResult && newValue !== props.searchResult.steamid) {
    emit('cancel')
  }
  emit('update:steamId', newValue)
  emit('clear-error')
}

// 键盘事件
const handleKeyUp = (event) => {
  if (event.key === 'Enter') {
    handleSearch()
  }
}
</script>

<template>
  <div class="space-y-5">
    <div>
      <label for="steamId" class="block text-sm font-medium text-gray-700 mb-3">
        Steam ID
      </label>
      
      <!-- 搜索结果信息 -->
      <div v-if="searchResult" class="mb-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-center gap-3">
            <div class="avatar shrink-0">
              <div class="w-12 h-12 rounded-full border-2 border-white shadow-sm">
                <img 
                  :src="avatarUrl" 
                  :alt="searchResult.persona_name"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <h4 class="font-semibold text-gray-900 truncate">{{ searchResult.persona_name }}</h4>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs text-gray-500">Steam ID:</span>
                <span class="text-xs font-mono text-gray-700 bg-white px-1.5 py-0.5 rounded border border-gray-200">{{ searchResult.steamid }}</span>
              </div>
            </div>
          </div>
          <div class="text-xs text-emerald-700 font-medium">
            搜索成功
          </div>
        </div>
      </div>
      
      <!-- 输入框和按钮容器 -->
      <div class="flex gap-3">
        <!-- 输入框 -->
        <div class="relative flex-1">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg class="h-4.5 w-4.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            id="steamId"
            :value="searchResult ? searchResult.steamid : props.steamId"
            type="text"
            :placeholder="searchResult ? '' : '请输入您的Steam ID'"
            autocomplete="off"
            class="w-full pl-12 py-3.5 border border-gray-200 rounded-xl text-sm bg-white focus:border-gray-300 focus:ring-0 focus:outline-none transition-all duration-300 hover:border-gray-300"
            :disabled="isSearching || isBinding"
            @keyup="handleKeyUp"
            @input="updateSteamId"
          />
        </div>
        
        <!-- 搜索/绑定按钮 -->
        <button
          v-if="!searchResult"
          @click="handleSearch"
          :disabled="isSearchButtonDisabled"
          class="inline-flex items-center justify-center px-6 py-3.5 w-35 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          :class="[
            isSearchButtonDisabled 
              ? 'bg-gray-100 text-gray-400' 
              : 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-md cursor-pointer'
          ]"
        >
          <template v-if="isSearching">
            <span class="loading loading-spinner loading-sm text-white"></span>
          </template>
          <template v-else>
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            搜索账户
          </template>
        </button>
        
        <div v-else class="flex gap-2">
          <button
            @click="handleBind"
            :disabled="isBindButtonDisabled"
            class="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex-1"
            :class="[
              isBindButtonDisabled 
                ? 'bg-gray-100 text-gray-400' 
                : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-md cursor-pointer'
            ]"
          >
            <template v-if="isBinding">
              <span class="loading loading-spinner loading-sm text-white"></span>
            </template>
            <template v-else>
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              绑定账户
            </template>
          </button>
          
          <button
            @click="handleCancel"
            :disabled="isBindButtonDisabled"
            class="inline-flex items-center justify-center px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- 提示信息 -->
      <div class="mt-3 flex items-start gap-2 text-xs text-gray-400 leading-relaxed">
        <svg class="w-3.5 h-3.5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>您可以在Steam个人资料页面找到您的Steam ID</span>
      </div>
    </div>
  </div>
</template>