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
  <div class="space-y-5">
    <!-- 通知设置 -->
    <div class="bg-white rounded-lg border border-gray-100 overflow-hidden">
      <div class="flex items-center justify-between p-4">
        <div>
          <h2 class="text-lg font-semibold text-gray-900">通知设置</h2>
          <p class="text-sm text-gray-500 mt-0.5">管理系统通知和提醒</p>
        </div>
        <div class="w-9 h-9 rounded-md bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
          <svg class="w-4.5 h-4.5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
      </div>

      <div class="border-t border-gray-100 px-4 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h4 class="font-medium text-gray-900">推送通知</h4>
            <p class="text-sm text-gray-500 mt-0.5">接收系统通知和提醒</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="settings.notifications" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
          </label>
        </div>
      </div>
    </div>

    <!-- 外观设置 -->
    <div class="bg-white rounded-lg border border-gray-100 overflow-hidden">
      <div class="flex items-center justify-between p-4">
        <div>
          <h2 class="text-lg font-semibold text-gray-900">外观设置</h2>
          <p class="text-sm text-gray-500 mt-0.5">自定义界面显示偏好</p>
        </div>
        <div class="w-9 h-9 rounded-md bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
          <svg class="w-4.5 h-4.5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        </div>
      </div>

      <div class="border-t border-gray-100 px-4 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h4 class="font-medium text-gray-900">深色模式</h4>
            <p class="text-sm text-gray-500 mt-0.5">切换到深色主题</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="settings.darkMode" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
          </label>
        </div>
      </div>
    </div>

    <!-- 语言和地区设置 -->
    <div class="bg-white rounded-lg border border-gray-100 overflow-hidden">
      <div class="flex items-center justify-between p-4">
        <div>
          <h2 class="text-lg font-semibold text-gray-900">语言和地区</h2>
          <p class="text-sm text-gray-500 mt-0.5">设置界面语言和时区</p>
        </div>
        <div class="w-9 h-9 rounded-md bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
          <svg class="w-4.5 h-4.5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <div class="border-t border-gray-100 px-4 py-4 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">语言</label>
          <select
            v-model="settings.language"
            class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:border-gray-300 focus:ring-0 focus:outline-none transition-colors"
          >
            <option v-for="lang in languages" :key="lang.value" :value="lang.value">
              {{ lang.label }}
            </option>
          </select>
          <p class="mt-1.5 text-xs text-gray-400">选择您偏好的界面语言</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">时区</label>
          <select
            v-model="settings.timezone"
            class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:border-gray-300 focus:ring-0 focus:outline-none transition-colors"
          >
            <option v-for="tz in timezones" :key="tz.value" :value="tz.value">
              {{ tz.label }}
            </option>
          </select>
          <p class="mt-1.5 text-xs text-gray-400">设置您的本地时区，用于时间显示</p>
        </div>
      </div>
    </div>

    <!-- 保存按钮 -->
    <div class="flex justify-end">
      <button
        @click="saveSettings"
        class="btn btn-sm bg-gray-900 text-white hover:bg-gray-800 border-0"
      >
        保存设置
      </button>
    </div>
  </div>
</template>
