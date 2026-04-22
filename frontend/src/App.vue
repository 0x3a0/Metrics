<script setup>
import { ref, onMounted } from 'vue';
import SidebarLayout from '@/components/sidebars/sidebarLayout.vue'
import SidebarContent from '@/components/sidebars/sidebarContent.vue'
import { getAccount } from '@/utils/api'

const boundAccounts = ref([]);
const isLoading = ref(true);

onMounted(async () => {
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
});

</script>

<template>
  <sidebar-layout>
    <template v-slot:sidebar-content>
      <SidebarContent />
    </template>

    <template v-slot:main-content>
      <router-view />
    </template>
  </sidebar-layout>

</template>
