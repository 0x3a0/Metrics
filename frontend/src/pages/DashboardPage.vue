<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAccount } from '@/utils/api'
import HeaderSection from '@/components/main/HeaderSection.vue'
import AnalyticsCards from '@/components/main/AnalyticsCards.vue'
import InventoryTable from '@/components/main/InventoryTable.vue'

const router = useRouter()

const accounts = ref([])
const activeAccount = ref(null)
const showModal = ref(false)
const modalMessage = ref('')
const isChecking = ref(true)

// 加载已绑定账号列表，未绑定时弹出引导 modal
const loadAccount = async () => {
  isChecking.value = true
  try {
    const response = await getAccount()
    if (response.status === 'success') {
      if (response.message.accounts && response.message.accounts.length > 0) {
        accounts.value = response.message.accounts
        activeAccount.value = response.message.accounts[0]
        showModal.value = false
      } else {
        accounts.value = []
        activeAccount.value = null
        showModal.value = true
        modalMessage.value = '请先绑定 Steam 账号以使用数据看板功能'
      }
    } else {
      accounts.value = []
      activeAccount.value = null
      showModal.value = true
      modalMessage.value = '无法获取账号信息，请检查网络连接后前往绑定'
    }
  } catch (error) {
    console.error('获取账号信息失败:', error)
    accounts.value = []
    activeAccount.value = null
    showModal.value = true
    modalMessage.value = '无法获取账号信息，请检查网络连接后前往绑定'
  } finally {
    isChecking.value = false
  }
}

const handleSwitchAccount = (account) => {
  activeAccount.value = account
}

const goToBind = () => {
  router.push({ name: 'Accounts' })
}

onMounted(() => {
  loadAccount()
})
</script>

<template>
  <div>
    <!-- 加载中 -->
    <div v-if="isChecking" class="flex items-center justify-center py-20">
      <div class="flex flex-col items-center gap-3">
        <svg class="w-6 h-6 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
        <span class="text-sm text-gray-500">加载中...</span>
      </div>
    </div>

    <!-- 正常内容 -->
    <div v-else class="space-y-5">
      <HeaderSection
        :accounts="accounts"
        :activeAccount="activeAccount"
        @switch-account="handleSwitchAccount"
      />
      <AnalyticsCards />
      <InventoryTable :steamId="activeAccount?.steam_id" />
    </div>

    <!-- 不可关闭的引导 modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
    >
      <div class="bg-white rounded-xl border border-gray-200 shadow-lg p-8 max-w-sm w-full mx-4">
        <div class="w-14 h-14 mx-auto mb-5 rounded-full bg-gray-50 flex items-center justify-center">
          <svg class="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>

        <h2 class="text-lg font-semibold text-gray-900 text-center mb-2">请绑定 Steam 账号</h2>
        <p class="text-sm text-gray-500 text-center mb-6 leading-relaxed">{{ modalMessage }}</p>

        <button
          @click="goToBind"
          class="w-full py-2.5 px-4 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
        >
          前往绑定
        </button>
      </div>
    </div>
  </div>
</template>
