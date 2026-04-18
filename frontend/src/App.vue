<script setup>
import { ref, onMounted } from 'vue';
import SidebarLayout from '@/components/sidebars/sidebarLayout.vue'
import SidebarContent from '@/components/sidebars/sidebarContent.vue'
import HeaderSection from '@/components/main/HeaderSection.vue'
import AnalyticsCards from '@/components/main/AnalyticsCards.vue'
import InventoryTable from '@/components/main/InventoryTable.vue'
import SteamBindModal from '@/components/SteamBindModal.vue'
import { getAccount } from '@/utils/api'

const showBindModal = ref(false);
const boundAccounts = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const response = await getAccount();
    if (response.status === 'success') {
      boundAccounts.value = response.message.accounts || [];
      if (boundAccounts.value.length === 0) {
        showBindModal.value = true;
      }
    }
  } catch (error) {
    console.error('获取账号信息失败:', error);
  } finally {
    isLoading.value = false;
  }
});

const handleBindSuccess = (account) => {
  boundAccounts.value.push(account);
  showBindModal.value = false;
};
</script>

<template>
  <sidebar-layout>
    <template v-slot:sidebar-content>
      <SidebarContent />
    </template>
    
    <template v-slot:main-content>
      <HeaderSection />
      <AnalyticsCards />
      <InventoryTable />
    </template>
  </sidebar-layout>

  <SteamBindModal 
    v-if="showBindModal" 
    @bind-success="handleBindSuccess"
  />
</template>
