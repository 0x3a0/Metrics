<script setup>
import { ref, watch } from 'vue'
import { getInventoryHistory } from '@/utils/api'

const props = defineProps({
  steamId: {
    type: String,
    default: null
  }
})

const inventoryData = ref([])
const isLoading = ref(false)
const errorMessage = ref('')

// 格式化价格（sell_price 可能为 null 或 undefined）
const formatPrice = (price) => {
  if (price == null || price === '') return '—'
  return `¥${Number(price).toFixed(2)}`
}

// 根据 steamId 加载库存数据
const loadData = async (steamId) => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const historyRes = await getInventoryHistory(steamId)
    if (historyRes.status === 'success') {
      inventoryData.value = historyRes.data || []
    } else {
      errorMessage.value = '获取库存数据失败'
    }
  } catch (error) {
    console.error('加载库存数据失败:', error)
    errorMessage.value = '网络连接失败，请稍后重试'
  } finally {
    isLoading.value = false
  }
}

// 监听 steamId 变化，自动加载对应账号库存
watch(() => props.steamId, (newId) => {
  if (newId) {
    loadData(newId)
  } else {
    inventoryData.value = []
    isLoading.value = false
    errorMessage.value = '请先绑定并选择一个 Steam 账号'
  }
}, { immediate: true })
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-lg font-semibold text-gray-900">饰品库存</h2>
        <p class="text-sm text-gray-500 mt-0.5">最新库存数据</p>
      </div>
    </div>

    <div class="bg-white rounded-lg border border-gray-100 overflow-hidden">
      <!-- 加载状态 -->
      <div v-if="isLoading" class="flex items-center justify-center py-16">
        <div class="flex flex-col items-center gap-3">
          <svg class="w-6 h-6 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          <span class="text-sm text-gray-500">正在加载库存数据...</span>
        </div>
      </div>

      <!-- 错误 / 空状态 -->
      <div v-else-if="errorMessage" class="flex items-center justify-center py-16">
        <div class="flex flex-col items-center gap-2">
          <svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
          </svg>
          <span class="text-sm text-gray-500">{{ errorMessage }}</span>
        </div>
      </div>

      <!-- 空数据 -->
      <div v-else-if="inventoryData.length === 0" class="flex items-center justify-center py-16">
        <div class="flex flex-col items-center gap-2">
          <svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
          </svg>
          <span class="text-sm text-gray-500">暂无库存数据</span>
          <span class="text-xs text-gray-400">等待爬虫同步数据</span>
        </div>
      </div>

      <!-- 数据表格 -->
      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-100">
            <tr>
              <th class="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">#</th>
              <th class="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">饰品名称</th>
              <th class="text-right py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">当前价格</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr
              v-for="(item, index) in inventoryData"
              :key="index"
              class="hover:bg-gray-50/50 transition-colors duration-150"
            >
              <td class="py-3 px-4">
                <span class="text-sm text-gray-400">{{ index + 1 }}</span>
              </td>
              <td class="py-3 px-4">
                <div class="text-sm font-medium text-gray-900">{{ item.market_name }}</div>
              </td>
              <td class="py-3 px-4 text-right">
                <span class="text-sm font-medium text-gray-900">{{ formatPrice(item.sell_price) }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 底部统计 -->
      <div v-if="!isLoading && !errorMessage" class="border-t border-gray-100 bg-gray-50 px-4 py-3">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-600">
            共 <span class="font-medium text-gray-900">{{ inventoryData.length }}</span> 件饰品
          </div>
          <button
            @click="loadData(props.steamId)"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-200/50 rounded transition-colors"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            刷新数据
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
