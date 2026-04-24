<script setup>
import SidebarLayout from '@/components/sidebars/sidebarLayout.vue'
import SidebarContent from '@/components/sidebars/sidebarContent.vue'
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
