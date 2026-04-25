<script setup>
import { ref } from 'vue';
import { deleteAccount } from '@/utils/api';

const props = defineProps({
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

const showDeleteDialog = ref(false);
const deletingAccount = ref(null);
const isDeleting = ref(false);
const deleteError = ref('');
const isRotating = ref(false);

const handleReload = () => {
  if (isRotating.value) return;
  
  isRotating.value = true;
  emit('reload');
  
  // 旋转动画持续600ms
  setTimeout(() => {
    isRotating.value = false;
  }, 600);
}

const closeModal = () => {
  showDeleteDialog.value = false;
  // 延迟清空数据，与 modal 的 200ms CSS 过渡同步
  setTimeout(() => {
    deletingAccount.value = null;
    deleteError.value = '';
  }, 200);
};

const handleDeleteClick = (account) => {
  deletingAccount.value = account;
  deleteError.value = '';
  showDeleteDialog.value = true;
};

const handleCloseDialog = () => {
  if (isDeleting.value) return;
  closeModal();
};

const handleConfirmDelete = async () => {
  if (!deletingAccount.value) return;

  isDeleting.value = true;
  deleteError.value = '';

  try {
    const response = await deleteAccount(deletingAccount.value.steam_id);

    if (response.status === 'success') {
      closeModal();
      emit('reload');
    } else {
      deleteError.value = response.message || '解绑失败，请稍后重试';
    }
  } catch (error) {
    deleteError.value = '网络连接失败，请稍后重试';
  } finally {
    isDeleting.value = false;
  }
};
</script>

<template>
  <div class="card group relative bg-white rounded-xl border border-gray-100 p-5 hover:border-gray-200 transition-all duration-200 hover:shadow-xs h-[480px] flex flex-col">
    <!-- 头部 -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold text-gray-900 tracking-tight">已绑定的账户</h2>
      <p class="text-sm text-gray-500 mt-1">您当前绑定的Steam账户</p>
    </div>

    <div v-if="isLoading" class="flex justify-center items-center flex-1">
      <span class="loading loading-spinner loading-md text-gray-600"></span>
    </div>

    <div v-else-if="accounts.length === 0" class="text-center flex flex-col justify-center items-center flex-1">
      <div class="w-16 h-16 mb-4 rounded-full bg-gray-50 flex items-center justify-center">
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <p class="text-gray-500 mb-2">暂无绑定的Steam账户</p>
      <p class="text-sm text-gray-400">请在下方绑定您的Steam账户</p>
    </div>

    <div v-else class="flex flex-col flex-1 min-h-0">
      <div class="overflow-y-auto overflow-x-auto flex-1 min-h-0">
        <table class="table w-full">
          <thead>
            <tr class="border-b border-gray-100">
              <th class="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">账户</th>
              <th class="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Steam ID</th>
              <th class="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Account ID</th>
              <th class="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">状态</th>
              <th class="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">操作</th>
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
              <td class="py-3 px-4">
                <button
                  @click="handleDeleteClick(account)"
                  class="btn btn-ghost btn-sm btn-square text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors duration-150"
                  title="解绑账号"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="border-t border-gray-100 px-4 py-3 shrink-0">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-600">
            共 <span class="font-medium">{{ accounts.length }}</span> 个账户
          </div>
          <button 
            @click="handleReload" 
            class="btn btn-ghost btn-sm btn-square text-gray-400 hover:text-gray-600 hover:bg-gray-50"
            :disabled="isRotating"
          >
            <svg :class="{ 'rotate-once': isRotating }" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 解绑确认对话框 -->
    <dialog class="modal" :class="{ 'modal-open': showDeleteDialog }">
      <div class="modal-box">
        <!-- 关闭按钮 -->
        <button
          class="btn btn-ghost btn-xs btn-square absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          :disabled="isDeleting"
          @click="handleCloseDialog"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 class="text-lg font-semibold text-gray-900">确认解绑</h3>
        <p class="text-sm text-gray-500 mt-1">此操作将解除该 Steam 账户的绑定</p>

        <div
          v-if="deletingAccount"
          class="mt-5 p-4 bg-gray-50 rounded-xl border border-gray-100"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full overflow-hidden shrink-0 ring-2 ring-white shadow-sm">
              <img
                :src="deletingAccount.avatar_url"
                :alt="deletingAccount.persona_name"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="min-w-0">
              <div class="text-sm font-medium text-gray-900 truncate">{{ deletingAccount.persona_name }}</div>
              <div class="text-xs text-gray-500 font-mono mt-0.5 truncate">{{ deletingAccount.steam_id }}</div>
            </div>
          </div>
        </div>

        <div v-if="deleteError" class="mt-4">
          <div class="alert alert-error text-sm py-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ deleteError }}</span>
          </div>
        </div>

        <div class="modal-action">
          <button
            class="btn btn-ghost btn-sm"
            :disabled="isDeleting"
            @click="handleCloseDialog"
          >
            取消
          </button>
          <button
            class="btn btn-sm border-gray-200 text-gray-600 hover:bg-red-50 hover:text-red-500"
            :class="{ 'loading': isDeleting }"
            :disabled="isDeleting"
            @click="handleConfirmDelete"
          >
            {{ isDeleting ? '解绑中...' : '确认解绑' }}
          </button>
        </div>
      </div>

      <form method="dialog" class="modal-backdrop">
        <button @click="handleCloseDialog" :disabled="isDeleting">close</button>
      </form>
    </dialog>
  </div>
</template>

<style scoped>
.rotate-once {
  animation: rotate 0.6s ease-in-out;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>