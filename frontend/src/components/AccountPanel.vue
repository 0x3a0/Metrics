<script setup>
import { ref, onMounted } from 'vue';
import { getAccount, searchAccount, bindAccount } from '@/utils/api';

const boundAccounts = ref([]);
const isLoading = ref(true);

const steamId = ref('');
const searchResult = ref(null);
const isSearching = ref(false);
const isBinding = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

const loadBoundAccounts = async () => {
  try {
    const response = await getAccount();
    if (response.status === 'success') {
      boundAccounts.value = response.message.accounts || [];
    }
  } catch (error) {
    console.error('获取账号信息失败:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadBoundAccounts();
});

const handleSearch = async () => {
  if (!steamId.value.trim()) {
    errorMessage.value = '请输入Steam ID';
    return;
  }

  errorMessage.value = '';
  successMessage.value = '';
  searchResult.value = null;
  isSearching.value = true;

  try {
    const response = await searchAccount(steamId.value.trim());

    if (response.status === 'success' && response.message && response.message.length > 0) {
      searchResult.value = response.message[0];
    } else {
      errorMessage.value = '未找到该Steam账号，请检查Steam ID是否正确';
    }
  } catch (error) {
    console.error('搜索账号失败:', error);
    errorMessage.value = '网络连接失败，请稍后重试';
  } finally {
    isSearching.value = false;
  }
};

const handleBind = async () => {
  if (!searchResult.value) return;

  isBinding.value = true;
  errorMessage.value = '';

  try {
    const avatarUrl = `https://avatars.cdn.steamchina.queniuam.com/${searchResult.value.avatar_url}_full.jpg`;

    const response = await bindAccount({
      steam_id: searchResult.value.steamid,
      account_id: searchResult.value.steamid,
      persona_name: searchResult.value.persona_name,
      avatar_url: avatarUrl
    });

    if (response.status === 'success') {
      successMessage.value = '账号绑定成功！';
      await loadBoundAccounts();
      steamId.value = '';
      searchResult.value = null;
      errorMessage.value = '';

      setTimeout(() => {
        successMessage.value = '';
      }, 3000);
    } else {
      errorMessage.value = '绑定失败，请稍后重试';
    }
  } catch (error) {
    console.error('绑定账号失败:', error);
    errorMessage.value = '绑定失败，请稍后重试';
  } finally {
    isBinding.value = false;
  }
};
</script>

<template>
  <div class="space-y-6">
    <!-- 成功消息 -->
    <div v-if="successMessage" class="flex items-center gap-2 text-emerald-600 text-sm bg-emerald-50 p-3 rounded-lg border border-emerald-100">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
      </svg>
      {{ successMessage }}
    </div>

    <!-- 已绑定的Steam账户 -->
    <div class="bg-white rounded-lg border border-gray-100 p-6">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-lg font-semibold text-gray-900">已绑定的账户</h2>
          <p class="text-sm text-gray-500 mt-0.5">您当前绑定的Steam账户</p>
        </div>
        <div class="text-sm text-gray-500">
          共 {{ boundAccounts.length }} 个账户
        </div>
      </div>

      <div v-if="isLoading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
      </div>

      <div v-else-if="boundAccounts.length === 0" class="text-center py-12">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <p class="text-gray-500 mb-2">暂无绑定的Steam账户</p>
        <p class="text-sm text-gray-400">请在下方的表单中绑定您的Steam账户</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="account in boundAccounts"
          :key="account.steam_id"
          class="group relative bg-gradient-to-br from-white to-gray-50 rounded-lg border border-gray-100 p-5 hover:border-gray-200 transition-all duration-200 hover:shadow-xs"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-4">
              <div class="relative">
                <div class="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm">
                  <img :src="account.avatar_url" :alt="account.persona_name" class="w-full h-full object-cover" />
                </div>
                <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                  <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="font-semibold text-gray-900 truncate">{{ account.persona_name }}</h4>
                <p class="text-sm text-gray-500 mt-1 font-mono bg-gray-50 px-2 py-1 rounded inline-block">{{ account.steam_id }}</p>
                <div class="flex items-center gap-2 mt-3">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    绑定于 {{ new Date(account.created_at).toLocaleDateString() }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 绑定新的Steam账户 -->
    <div class="bg-white rounded-lg border border-gray-100 p-6">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-lg font-semibold text-gray-900">绑定新账户</h2>
          <p class="text-sm text-gray-500 mt-0.5">搜索并绑定您的Steam账户</p>
        </div>
        <div class="text-sm text-gray-500">
          步骤 {{ searchResult ? '2/2' : '1/2' }}
        </div>
      </div>

      <div v-if="!searchResult" class="space-y-6">
        <div>
          <label for="steamId" class="block text-sm font-medium text-gray-700 mb-3">Steam ID</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              id="steamId"
              type="text"
              v-model="steamId"
              placeholder="请输入您的Steam ID"
              class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-200 text-sm bg-white"
              :disabled="isSearching || isBinding"
              @keyup.enter="handleSearch"
            />
          </div>
          <p class="mt-3 text-sm text-gray-500 flex items-center gap-1.5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            您可以在Steam个人资料页面找到您的Steam ID
          </p>
        </div>

        <button
          @click="handleSearch"
          class="w-full py-3 px-4 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white font-medium rounded-lg transition-all duration-200 disabled:from-gray-400 disabled:to-gray-300 disabled:cursor-not-allowed shadow-sm hover:shadow"
          :disabled="isSearching || isBinding || !steamId.trim()"
        >
          <span v-if="isSearching" class="inline-flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            搜索中...
          </span>
          <span v-else class="inline-flex items-center justify-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            搜索账号
          </span>
        </button>

        <div v-if="errorMessage" class="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          {{ errorMessage }}
        </div>
      </div>

      <div v-if="searchResult" class="space-y-6">
        <div class="text-center mb-6">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 mb-4">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900">确认账户信息</h3>
          <p class="text-sm text-gray-500 mt-1">请确认以下账户信息是否正确</p>
        </div>

        <div class="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200">
          <div class="flex items-center gap-6">
            <div class="relative">
              <div class="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img :src="`https://avatars.cdn.steamchina.queniuam.com/${searchResult.avatar_url}_full.jpg`" :alt="searchResult.persona_name" class="w-full h-full object-cover" />
              </div>
              <div class="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-500 rounded-full border-3 border-white flex items-center justify-center shadow-md">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <div class="flex-1">
              <h4 class="text-xl font-bold text-gray-900 mb-2">{{ searchResult.persona_name }}</h4>
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <span class="text-sm font-medium text-gray-700">Steam ID:</span>
                  <span class="font-mono text-sm bg-gray-100 px-3 py-1 rounded-lg">{{ searchResult.steamid }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="text-xs text-gray-500">绑定后，系统将自动同步您的库存数据</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            @click="handleBind"
            class="py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200 disabled:from-blue-300 disabled:to-blue-200 disabled:cursor-not-allowed shadow-sm hover:shadow"
            :disabled="isBinding"
          >
            <span v-if="isBinding" class="inline-flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              绑定中...
            </span>
            <span v-else class="inline-flex items-center justify-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              确认绑定
            </span>
          </button>

          <button
            @click="searchResult = null; errorMessage = ''; steamId = ''"
            class="py-3 px-4 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="isBinding"
          >
            <span class="inline-flex items-center justify-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              返回搜索
            </span>
          </button>
        </div>

        <div v-if="errorMessage" class="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>