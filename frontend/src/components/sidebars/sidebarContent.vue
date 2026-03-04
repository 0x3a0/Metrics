<script setup>
import {defineProps, ref} from 'vue';
import DashboardIcon from '@/components/icons/dashboardIcon.vue';
import SettingIcon from '@/components/icons/settingIcon.vue';


const activeId = ref(1);
const setActiveItem = id => {
  activeId.value = id;
}
</script>

<template>
  <a href="/" class="px-2 py-1.5 rounded-lg hover:bg-zinc-950/5 text-sm">
    <div class="flex gap-2 items-center">
      <component :is="DashboardIcon" class="w-5 h-5"></component>
      <span class="flex-1 font-medium">Dashboard</span>
    </div>
  </a>
  <a href="/" class="px-2 py-1.5 rounded-lg hover:bg-zinc-950/5 text-sm">
    <div class="flex gap-2 items-center">
      <component :is="SettingIcon" class="w-5 h-5"></component>
      <span class="flex-1 font-medium">Setting</span>
    </div>
  </a>
</template>

<style scoped>

</style>