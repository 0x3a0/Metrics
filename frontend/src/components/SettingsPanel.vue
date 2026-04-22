<script setup>
import { ref } from 'vue';

const settings = ref({
  notifications: true,
  darkMode: false,
  language: 'zh-CN',
  timezone: 'Asia/Shanghai'
});

const languages = [
  { value: 'zh-CN', label: '简体中文' },
  { value: 'en-US', label: 'English (US)' },
  { value: 'ja-JP', label: '日本語' }
];

const timezones = [
  { value: 'Asia/Shanghai', label: '上海 (UTC+8)' },
  { value: 'Asia/Tokyo', label: '东京 (UTC+9)' },
  { value: 'America/New_York', label: '纽约 (UTC-5)' },
  { value: 'Europe/London', label: '伦敦 (UTC+0)' }
];

const saveSettings = () => {
  console.log('保存设置:', settings.value);
};
</script>

<template>
  <div class="space-y-6">
    <!-- 通知设置 -->
    <div class="bg-white rounded-lg border border-gray-200 p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">通知设置</h3>
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h4 class="font-medium text-gray-900">推送通知</h4>
            <p class="text-sm text-gray-500 mt-0.5">接收系统通知和提醒</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="settings.notifications" class="sr-only peer">
            <div class="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gray-900"></div>
          </label>
        </div>
        <div class="pt-4 border-t border-gray-100">
          <p class="text-sm text-gray-500">
            通知设置控制您接收系统通知的方式。关闭后将不会收到任何推送通知。
          </p>
        </div>
      </div>
    </div>

    <!-- 外观设置 -->
    <div class="bg-white rounded-lg border border-gray-200 p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">外观设置</h3>
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h4 class="font-medium text-gray-900">深色模式</h4>
            <p class="text-sm text-gray-500 mt-0.5">切换到深色主题</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="settings.darkMode" class="sr-only peer">
            <div class="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gray-900"></div>
          </label>
        </div>
        <div class="pt-4 border-t border-gray-100">
          <p class="text-sm text-gray-500">
            深色模式可以减少眼睛疲劳，特别是在低光环境下使用。
          </p>
        </div>
      </div>
    </div>

    <!-- 语言和地区设置 -->
    <div class="bg-white rounded-lg border border-gray-200 p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">语言和地区</h3>
      <div class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">语言</label>
          <select
            v-model="settings.language"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors text-sm bg-white"
          >
            <option v-for="lang in languages" :key="lang.value" :value="lang.value">
              {{ lang.label }}
            </option>
          </select>
          <p class="mt-2 text-sm text-gray-500">选择您偏好的界面语言</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">时区</label>
          <select
            v-model="settings.timezone"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors text-sm bg-white"
          >
            <option v-for="tz in timezones" :key="tz.value" :value="tz.value">
              {{ tz.label }}
            </option>
          </select>
          <p class="mt-2 text-sm text-gray-500">设置您的本地时区，用于时间显示</p>
        </div>
      </div>
    </div>

    <!-- 保存按钮 -->
    <div class="flex justify-end">
      <button
        @click="saveSettings"
        class="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors"
      >
        保存设置
      </button>
    </div>
  </div>
</template>