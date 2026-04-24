<script setup>
import { ref, onMounted } from 'vue';
import { getAccount, searchAccount, bindAccount } from '@/utils/api';
import AlertMessage from '../AlertMessage.vue';
import ToastMessage from '../ToastMessage.vue';
import AccountList from './AccountList.vue';
import AccountSearchForm from './AccountSearchForm.vue';

const boundAccounts = ref([]);
const isLoading = ref(true);

const steamId = ref('');
const searchResult = ref(null);
const isSearching = ref(false);
const isBinding = ref(false);
const errorMessage = ref('');
const errorType = ref('error');
const successMessage = ref('');

const currentStep = ref(1);

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

const formatAvatarUrl = (avatarHash) => {
  const hash = avatarHash === '0000000000000000000000000000000000000000' 
    ? 'fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb'
    : avatarHash;
  return `https://avatars.cdn.steamchina.eccdnx.com/${hash}_full.jpg`;
};

const handleBindError = (error) => {
  // 检查是否有后端返回的错误响应
  if (error.response && error.response.data && error.response.data.status === 'error') {
    const errorData = error.response.data;
    if (errorData.code === 'ACCOUNT_ALREADY_BOUND') {
      errorMessage.value = '该账号已绑定，无需重复绑定';
      errorType.value = 'warning';
    } else {
      errorMessage.value = errorData.message || '绑定失败，请稍后重试';
      errorType.value = 'error';
    }
  } else {
    errorMessage.value = '绑定失败，请稍后重试';
    errorType.value = 'error';
  }
};

onMounted(() => {
  loadBoundAccounts();
});

const handleSearch = async (searchId) => {
  if (!searchId) {
    errorMessage.value = '请输入Steam ID';
    return;
  }

  errorMessage.value = '';
  successMessage.value = '';
  searchResult.value = null;
  isSearching.value = true;

  try {
    const response = await searchAccount(searchId);

    if (response.status === 'success' && response.message && response.message.length > 0) {
      const result = response.message[0];
      if (result.avatar_url == '0000000000000000000000000000000000000000') {
        result.avatar_url = 'fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb';
      }
      searchResult.value = result;
      currentStep.value = 2;
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
  errorType.value = 'error';

  try {
    const avatarUrl = formatAvatarUrl(searchResult.value.avatar_url);

    const response = await bindAccount({
      steam_id: searchResult.value.steamid,
      account_id: searchResult.value.accountid.toString(),
      persona_name: searchResult.value.persona_name,
      avatar_url: avatarUrl
    });

    if (response.status === 'success') {
      successMessage.value = '账号绑定成功！';
      await loadBoundAccounts();
      steamId.value = '';
      searchResult.value = null;
      errorMessage.value = '';
      errorType.value = 'success';
      currentStep.value = 1;
    } else if (response.status === 'error') {
      // 处理特定错误类型
      if (response.code === 'ACCOUNT_ALREADY_BOUND') {
        errorMessage.value = '该账号已绑定，无需重复绑定';
        errorType.value = 'warning';
      } else {
        errorMessage.value = response.message || '绑定失败，请稍后重试';
        errorType.value = 'error';
      }
    } else {
      errorMessage.value = '绑定失败，请稍后重试';
    }
  } catch (error) {
    console.error('绑定账号失败:', error);
    handleBindError(error);
  } finally {
    isBinding.value = false;
  }
};

const handleCancelSearch = () => {
  searchResult.value = null;
  errorMessage.value = '';
  errorType.value = 'error';
  steamId.value = '';
  currentStep.value = 1;
};

const handleClearError = () => {
  errorMessage.value = '';
  errorType.value = 'error';
};
</script>

<template>
  <div class="space-y-6">
    <!-- 成功提示 Toast -->
    <ToastMessage
      v-if="successMessage"
      type="success"
      message="账号绑定成功！"
      @close="successMessage = ''"
    />

    <!-- 已绑定的Steam账户 -->
    <AccountList
      :accounts="boundAccounts"
      :isLoading="isLoading"
      @reload="loadBoundAccounts"
    />

    <!-- 绑定新的Steam账户 -->
    <div class="group relative bg-white rounded-xl border border-gray-100 p-5 hover:border-gray-200 transition-all duration-200 hover:shadow-xs">
      <!-- 头部 -->
      <div class="mb-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-xl font-semibold text-gray-900 tracking-tight">绑定新账户</h2>
            <p class="text-sm text-gray-500 mt-1">搜索并绑定您的Steam账户以开始追踪库存</p>
          </div>
        </div>

        <!-- 步骤指示器 -->
        <div class="flex items-center gap-4 mt-6">
          <div class="flex items-center gap-3">
            <div
              :class="[
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300',
                currentStep >= 1 
                  ? 'bg-gray-900 text-white shadow-sm' 
                  : 'bg-gray-50 text-gray-400'
              ]"
            >1</div>
            <div class="flex flex-col">
              <span :class="['text-sm font-medium', currentStep >= 1 ? 'text-gray-900' : 'text-gray-400']">搜索账号</span>
              <span class="text-xs text-gray-400 mt-0.5">输入Steam ID</span>
            </div>
          </div>
          
          <div :class="['flex-1 h-0.5', currentStep >= 2 ? 'bg-gray-900' : 'bg-gray-100']"></div>
          
          <div class="flex items-center gap-3">
            <div
              :class="[
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300',
                currentStep >= 2 
                  ? 'bg-gray-900 text-white shadow-sm' 
                  : 'bg-gray-50 text-gray-400'
              ]"
            >2</div>
            <div class="flex flex-col">
              <span :class="['text-sm font-medium', currentStep >= 2 ? 'text-gray-900' : 'text-gray-400']">确认绑定</span>
              <span class="text-xs text-gray-400 mt-0.5">验证并绑定</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="border-t border-gray-50 pt-6">
        <div class="space-y-5">
          <AccountSearchForm
            :isSearching="isSearching"
            :isBinding="isBinding"
            :errorMessage="errorMessage"
            :searchResult="searchResult"
            :steamId="steamId"
            @search="handleSearch"
            @clear-error="handleClearError"
            @bind="handleBind"
            @cancel="handleCancelSearch"
            @update:steamId="steamId = $event"
          />

          <AlertMessage v-if="errorMessage" :type="errorType" :message="errorMessage" />
        </div>
      </div>
    </div>
  </div>
</template>
