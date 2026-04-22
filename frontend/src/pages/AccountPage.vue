<script setup>
import AccountPanel from '@/components/AccountPanel.vue';
</script>

<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-semibold text-gray-900">Steam账户管理</h1>
        <p class="text-sm text-gray-500 mt-0.5">管理您绑定的Steam账户</p>
      </div>
    </div>
    <AccountPanel />
  </div>
</template>