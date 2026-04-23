<script setup>
import { ref, onMounted } from 'vue';

defineProps({
  accounts: {
    type: Array,
    default: () => []
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['reload'])

const handleReload = () => {
  emit('reload')
}
</script>

<template>
  <div class="card group relative bg-white rounded-xl border border-gray-100 p-5 hover:border-gray-200 transition-all duration-200 hover:shadow-xs">
    <!-- 头部 -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold text-gray-900 tracking-tight">已绑定的账户</h2>
      <p class="text-sm text-gray-500 mt-1">您当前绑定的Steam账户</p>
    </div>

    <div v-if="isLoading" class="flex justify-center py-12">
      <span class="loading loading-spinner loading-md text-gray-600"></span>
    </div>

    <div v-else-if="accounts.length === 0" class="text-center py-12 border-t border-gray-50">
      <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center">
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <p class="text-gray-500 mb-2">暂无绑定的Steam账户</p>
      <p class="text-sm text-gray-400">请在下方绑定您的Steam账户</p>
    </div>

    <div v-else>
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr class="border-b border-gray-100">
              <th class="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">账户</th>
              <th class="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Steam ID</th>
              <th class="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Account ID</th>
              <th class="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">状态</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="account in accounts"
              :key="account.steam_id"
              class="hover:bg-gray-50/50 transition-colors duration-150"
            >
              <td class="py-3 px-4">
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="w-10 h-10 rounded-full border-2 border-white shadow-sm">
                      <img :src="account.avatar_url" :alt="account.persona_name" class="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div class="font-medium text-gray-900">{{ account.persona_name }}</div>
                </div>
              </td>
              <td class="py-3 px-4">
                <div class="text-sm text-gray-600 font-mono bg-gray-50 px-2.5 py-1 rounded border border-gray-100">{{ account.steam_id }}</div>
              </td>
              <td class="py-3 px-4">
                <div class="text-sm text-gray-600 font-mono bg-gray-50 px-2.5 py-1 rounded border border-gray-100">{{ account.account_id }}</div>
              </td>
              <td class="py-3 px-4">
                <span class="badge badge-outline badge-success gap-1.5 text-xs">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  已绑定
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="border-t border-gray-100 px-4 py-3">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-600">
            共 <span class="font-medium">{{ accounts.length }}</span> 个账户
          </div>
          <button @click="handleReload" class="btn btn-ghost btn-sm btn-square">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
