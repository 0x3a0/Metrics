<script setup>
import { ref } from 'vue';
import { searchAccount, bindAccount } from '@/utils/api';

const emit = defineEmits(['bind-success']);

const steamId = ref('');
const searchResult = ref(null);
const isSearching = ref(false);
const isBinding = ref(false);
const errorMessage = ref('');

const handleSearch = async () => {
  if (!steamId.value.trim()) {
    errorMessage.value = '请输入Steam ID';
    return;
  }

  errorMessage.value = '';
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
      emit('bind-success', searchResult.value);
      steamId.value = '';
      searchResult.value = null;
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
  <dialog class="modal modal-open">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 mx-4">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">绑定Steam账号</h2>
        <p class="text-sm text-gray-500">请输入您的Steam ID以绑定账号</p>
      </div>

      <div v-if="!searchResult" class="space-y-6">
        <div>
          <input 
            type="text" 
            v-model="steamId"
            placeholder="请输入Steam ID"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors text-sm bg-white"
            :disabled="isSearching || isBinding"
            @keyup.enter="handleSearch"
          />
        </div>

        <button 
          @click="handleSearch"
          class="w-full py-3 px-4 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          :disabled="isSearching || isBinding || !steamId.trim()"
        >
          <span v-if="isSearching" class="inline-flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            搜索中...
          </span>
          <span v-else>搜索账号</span>
        </button>

        <div v-if="errorMessage" class="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          {{ errorMessage }}
        </div>
      </div>

      <div v-if="searchResult" class="space-y-6">
        <div class="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
          <div class="w-16 h-16 rounded-full overflow-hidden shrink-0">
            <img :src="`https://avatars.cdn.steamchina.queniuam.com/${searchResult.avatar_url}_full.jpg`" :alt="searchResult.persona_name" class="w-full h-full object-cover" />
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="font-semibold text-base text-gray-900 truncate">{{ searchResult.persona_name }}</h4>
            <p class="text-xs text-gray-500 mt-1">{{ searchResult.steamid }}</p>
          </div>
        </div>

        <button 
          @click="handleBind"
          class="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
          :disabled="isBinding"
        >
          <span v-if="isBinding" class="inline-flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            绑定中...
          </span>
          <span v-else>确认绑定</span>
        </button>

        <button 
          @click="searchResult = null; errorMessage = ''; steamId = ''"
          class="w-full py-2 px-4 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          :disabled="isBinding"
        >
          返回搜索
        </button>

        <div v-if="errorMessage" class="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </dialog>
</template>
